import { getSingleProduct } from "./products";
import { createSingleProductPreference } from "lib/mercadopago";
import { v4 as uuidv4 } from "uuid";
import { Order } from "models/orders";
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
    const newId: string = uuidv4();
    const newOrder = await Order.createNewOrder(
      productId,
      productData.unit_cost,
      newId,
      userId
    );
    const newPref = await createSingleProductPreference({
      productName: productData.name,
      productDescription: productData.description,
      productId: productData.id,
      productPrice: productData.unit_cost,
      transactionId: productData.id,
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
    amount: singleOrder.dataValues.amount,
    productId: singleOrder.dataValues.productId,
    status: singleOrder.dataValues.status,
  };
  return formatResponse;
}
