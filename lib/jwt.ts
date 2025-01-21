import jwt from "jsonwebtoken";
export function generate(obj) {
  const token = jwt.sign(obj, process.env.JWT_TOKEN);

  return token;
}

export function decode(token) {
  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    return decoded;
  } catch (err) {
    console.error("token incorrecto");
    return null;
  }
}
