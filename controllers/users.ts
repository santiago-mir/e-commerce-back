import { User, Auth, Order } from "models/models";
import { generateCodeAndExpiresDate } from "lib/date-fns";
import { findOrCreateAuth } from "./auth";
import { sendEmail } from "lib/nodemailer";
import { createSingleProductPreference } from "lib/mercadopago";
import { getSingleProduct } from "./products";
import { v4 as uuidv4 } from "uuid";
type findOrCreateUserResponse = {
  message: string;
};
type findByEmailResponse = {
  id: number;
  name: string;
  email: string;
  address: string | null;
};
export async function findOrCreateUser(
  email: string,
  userName: string
): Promise<findOrCreateUserResponse> {
  const createdOrNewuser: User = await User.findOrCreateUser(email, userName);
  if (!createdOrNewuser) {
    return null;
  } else {
    const userId: number = createdOrNewuser.id;
    const { code, expires } = generateCodeAndExpiresDate();
    const createdOrNewAuth: Auth = await findOrCreateAuth(
      email,
      userId,
      code,
      expires
    );
    if (!createdOrNewAuth) {
      return null;
    } else {
      const response = await sendEmail(email, code);
      return {
        message:
          "email sent to: " + email + " with response: " + response.message,
      };
    }
  }
}
export async function findUserByEmail(
  email: string
): Promise<findByEmailResponse> {
  const userFound: User = await User.findByEmail(email);
  const userData = {
    id: userFound.id,
    name: userFound.name,
    email: userFound.email,
    address: userFound.address,
  };
  return userData;
}

export async function updateUserData(
  currentEmail: string,
  fieldsToUpdate: Partial<{
    newName: string;
    newEmail: string;
    newAddress: string;
  }>
) {
  const response = await User.updateUserInfo(currentEmail, fieldsToUpdate);
  return response;
}

export async function updateUserAdress(
  currentEmail: string,
  newAddress: string
) {
  const response = await User.updateUserAdress(currentEmail, newAddress);
  return response;
}

type OrderResponse = {
  orderId: string;
  mercadoPagoURL: string;
};

export async function generateOrder(
  productId: string,
  userId: number
): Promise<OrderResponse> {
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
  const response: OrderResponse = {
    orderId: newOrder.dataValues.id,
    mercadoPagoURL: newPref.init_point,
  };
  return response;
}
