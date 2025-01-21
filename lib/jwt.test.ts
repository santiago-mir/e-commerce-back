import { generate, decode } from "./jwt";

import test from "ava";

test("foo", (t) => {
  const payload = { santi: true };
  const token = generate(payload);
  const salida = decode(token) as any;
  delete salida.iat;
  t.deepEqual(payload, salida);
});
