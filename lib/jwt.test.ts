import { JwtPayload } from "jsonwebtoken";
import { generate, decode } from "./jwt";
import test from "ava";

test("jwt encode and decode", (t) => {
  const payload = { santi: true };
  const token = generate(payload);
  const salida = decode(token) as JwtPayload;
  delete salida.iat;
  t.deepEqual(payload, salida);
});
