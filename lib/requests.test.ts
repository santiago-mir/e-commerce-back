import test from "ava";
import { getLimitAndOffset } from "./requests";
import type { NextApiRequest } from "next";
test("getLimitAndOffset with empty req", (t) => {
  const req = { query: {} } as unknown as NextApiRequest;
  const defaultResult = getLimitAndOffset(req, 50, 100);
  t.deepEqual(defaultResult, { limit: 10, offset: 0 });
});
test("getLimitAndOffset with valid req and values off range", (t) => {
  const req = {
    query: { limit: "100", offset: "200" },
  } as unknown as NextApiRequest;
  const expectedResult = getLimitAndOffset(req, 50, 100);
  t.deepEqual(expectedResult, { limit: 50, offset: 100 });
});
test("getLimitAndOffset with valid req and values in range", (t) => {
  const req = {
    query: { limit: "5", offset: "5" },
  } as unknown as NextApiRequest;
  const expectedResult = getLimitAndOffset(req, 50, 100);
  t.deepEqual(expectedResult, { limit: 5, offset: 5 });
});
test("getLimitAndOffset with valid req and invalid values", (t) => {
  const req = {
    query: { limit: "a", offset: "b" },
  } as unknown as NextApiRequest;
  const expectedResult = getLimitAndOffset(req, 50, 100);
  t.deepEqual(expectedResult, { limit: 10, offset: 0 });
});
