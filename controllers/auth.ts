import { Auth } from "models/models";

export async function findOrCreateAuth(
  email: string,
  userId: number,
  code: number,
  expires: Date
): Promise<Auth> {
  const [auth, created] = await Auth.findOrCreateAuth(
    email,
    userId,
    code,
    expires
  );
  if (!created) {
    await Auth.updateCodeAndDate(code, expires, email);
  }
  return auth;
}
