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
    await Auth.updateCodeAndDate(email, expires, code);
  }
  return auth;
}

export async function getCodeStatus(
  email: string,
  code: number
): Promise<boolean> {
  const auth = await Auth.findByEmail(email);
  if (!auth) {
    return null;
  } else {
    const { validationCode, expireDate } = auth;
    const now = new Date();
    if (code == validationCode && expireDate > now) {
      // invalidate code
      await Auth.updateCodeAndDate(email, now);
      return true;
    } else {
      return false;
    }
  }
}
