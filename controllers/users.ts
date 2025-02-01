import { User, Auth, Order } from "models/models";
import { generateCodeAndExpiresDate } from "lib/date-fns";
import { findOrCreateAuth } from "./auth";
import { sendEmail } from "lib/nodemailer";

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
