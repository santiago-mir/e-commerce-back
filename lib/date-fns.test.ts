import test from "ava";
import { generateCodeAndExpiresDate } from "./date-fns";
import { addMinutes } from "date-fns";
test("generate code and expires date 20 minutes later", (t) => {
  const mockDate = new Date("2023-01-01T12:00:00Z");
  const { code, expires } = generateCodeAndExpiresDate(mockDate);
  t.true(
    code >= 10000 && code <= 99999,
    "el codigo debe tener codigo de 5 cifras"
  );

  const expectedExpiresDate = addMinutes(mockDate, 20);
  t.is(
    expires.getTime(),
    expectedExpiresDate.getTime(),
    "La fecha de expiracion tiene que ser de 20 minutos de diferencia"
  );
});
