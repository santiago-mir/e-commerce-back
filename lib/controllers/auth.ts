import { User } from "lib/models/user";
import { Auth } from "lib/models/auth";
import { addMinutes } from "date-fns/addMinutes";
import { sendEmail } from "lib/nodemailer";
export async function findOrCreateAuth(email: string): Promise<Auth> {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);
  if (auth) {
    return auth;
  } else {
    const newUser = await User.createNewUser({
      email: cleanEmail,
    });
    const newAuth = await Auth.createNewAuth({
      email: cleanEmail,
      userId: newUser.id,
      code: "",
      expires: new Date(),
    });
    return newAuth;
  }
}
export async function getCodeStatus(email: string, code: number) {
  const cleanEmail = email.trim().toLowerCase();
  const auth = await Auth.findByEmail(cleanEmail);
  if (auth) {
    const authCode = auth.data.code;
    const expiresDate = new Date(
      auth.data.expires._seconds * 1000 +
        auth.data.expires._nanoseconds / 1000000
    );
    const now = new Date();
    if (code == authCode && expiresDate > now) {
      const userId = auth.data.userId;
      const userEmail = auth.data.email;
      const res = {
        userEmail,
        userId,
      };
      return res;
    }
  } else {
    return null;
  }
}

export async function sendCode(email: string) {
  const auth = await findOrCreateAuth(email);
  const code = Math.floor(10000 + Math.random() * 90000);
  const now = new Date();
  const twentyFromNow = addMinutes(now, 20);
  auth.data.code = code;
  auth.data.expires = twentyFromNow;
  await auth.push();
  await sendEmail(email, code);
  return auth;
}
