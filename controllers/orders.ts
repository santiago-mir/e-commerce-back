import { getSingleProduct } from "./products";
import { createSingleProductPreference } from "lib/mercadopago";
import { v4 as uuidv4 } from "uuid";
import { Order } from "models/orders";
import { sendConfirmOrderEmail, sendVerificationEmail } from "lib/nodemailer";
import { User } from "models/user";
import { airtableBase } from "lib/airtable";
type NewOrderResponse = {
  orderId: string;
  mercadoPagoURL: string;
};

export async function generateOrder(
  productId: string,
  userId: number
): Promise<NewOrderResponse> {
  try {
    const productData = await getSingleProduct(productId);
    const newOrderId: string = uuidv4();
    const newOrder = await Order.createNewOrder(
      productData.name,
      productId,
      productData.unit_cost,
      newOrderId,
      userId
    );
    const newPref = await createSingleProductPreference({
      productName: productData.name,
      productDescription: productData.description,
      productId: productData.id,
      productPrice: productData.unit_cost,
      transactionId: newOrderId,
    });
    const response: NewOrderResponse = {
      orderId: newOrder.dataValues.id,
      mercadoPagoURL: newPref.init_point,
    };
    return response;
  } catch (err) {
    throw err;
  }
}

type GetOrderResponse = {
  orderId: string;
  productName: string;
  productId: string;
  status: string;
  amount: number;
};

export async function getAllOrders(
  userId: number
): Promise<GetOrderResponse[]> {
  const allOrders = await Order.getAllOrders(userId);
  const formatResponse = allOrders.map((ord) => {
    let formatOrder: GetOrderResponse = {
      orderId: ord.dataValues.id,
      productName: ord.dataValues.name,
      productId: ord.dataValues.productId,
      amount: ord.dataValues.amount,
      status: ord.dataValues.status,
    };
    return formatOrder;
  });
  return formatResponse;
}

export async function getSingleOrder(
  orderId: string
): Promise<GetOrderResponse> {
  const singleOrder = await Order.getSingleOrder(orderId);
  if (!singleOrder) {
    throw "El ID no esta asociado a una Orden valida";
  }
  const formatResponse: GetOrderResponse = {
    orderId: singleOrder.dataValues.id,
    productName: singleOrder.dataValues.name,
    amount: singleOrder.dataValues.amount,
    productId: singleOrder.dataValues.productId,
    status: singleOrder.dataValues.status,
  };
  return formatResponse;
}

type confirmOrderResponse = {
  message: string;
};

export async function confirmOrder(
  orderId: string
): Promise<confirmOrderResponse> {
  try {
    await Order.confirmOrder(orderId);
    const orderData = await getSingleOrder(orderId);
    const userData = await User.getUserByOrderId(orderId);
    // // generate delivery record
    await airtableBase("Delivery").create({
      productName: orderData.productName,
      productId: orderData.productId,
      owner: userData.dataValues.email,
      address: userData.dataValues.address,
    });
    // send confirmation email
    const emailResponse = await sendConfirmOrderEmail(
      userData.dataValues.email,
      orderData.productName
    );
    return {
      message:
        "purchase confimation email sent to: " +
        userData.dataValues.email +
        " with response: " +
        emailResponse.message,
    };
  } catch (err) {
    throw err;
  }
}
