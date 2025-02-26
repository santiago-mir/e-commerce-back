import { User, Auth, Order } from "models/models";
import { generateCodeAndExpiresDate } from "lib/date-fns";
import { findOrCreateAuth } from "./auth";
import { sendVerificationEmail } from "lib/nodemailer";

type findOrCreateUserResponse = {
  message: string;
};
type findByEmailResponse = {
  id: number;
};

type getUserDataResponse = {
  id: number;
  name: string;
  email: string;
  address: string;
};
type updateUserDataResponse = {
  message: string;
  fieldsUpdated: number;
};

export async function authUser(
  email: string,
  userName?: string
): Promise<findOrCreateUserResponse> {
  let userFoundOrCreated: User | findByEmailResponse;
  if (userName) {
    userFoundOrCreated = await User.findOrCreateUser(email, userName);
  } else {
    userFoundOrCreated = await findUserByEmail(email);
  }
  if (!userFoundOrCreated) {
    throw "El usuario no pudo ser creado correctamente";
  }
  const userId: number = userFoundOrCreated.id;
  const { code, expires } = generateCodeAndExpiresDate();
  const createdOrNewAuth: Auth = await findOrCreateAuth(
    email,
    userId,
    code,
    expires
  );
  if (!createdOrNewAuth) {
    throw "El registro auth no pudo ser creado correctamente";
  } else {
    const response = await sendVerificationEmail(email, code);
    return {
      message:
        "email sent to: " + email + " with response: " + response.message,
    };
  }
}
export async function findUserByEmail(
  email: string
): Promise<findByEmailResponse> {
  const userFound: User = await User.findByEmail(email);
  if (!userFound) {
    throw "El mail no esta asociado a un usuario valido";
  }
  const userId = { id: userFound.id };
  return userId;
}

export async function getUserData(id: number): Promise<getUserDataResponse> {
  const userFound: User = await User.getUserData(id);
  const response: getUserDataResponse = {
    id: userFound.dataValues.id,
    name: userFound.dataValues.name,
    email: userFound.dataValues.email,
    address: userFound.dataValues.address,
  };
  return response;
}

export async function updateUserData(
  userId: number,
  fieldsToUpdate: Partial<{
    name: string;
    email: string;
    address: string;
  }>
) {
  const fieldsUpdated = await User.updateUserInfo(userId, fieldsToUpdate);
  const response: updateUserDataResponse = {
    fieldsUpdated: fieldsUpdated[0],
    message: "Se ha actualizado la data correctamente",
  };
  return response;
}

export async function updateUserAdress(
  userId: number,
  newAddress: string
): Promise<updateUserDataResponse> {
  const fieldsUpdated = await User.updateUserAdress(userId, newAddress);
  const response: updateUserDataResponse = {
    fieldsUpdated: fieldsUpdated[0],
    message: "El campo address fue actualizado correctamente",
  };
  return response;
}
