import { addMinutes } from "date-fns/addMinutes";
export function generateCodeAndExpiresDate(actualDate: Date = new Date()): {
  code: number;
  expires: Date;
} {
  const code: number = Math.floor(10000 + Math.random() * 90000);
  const twentyFromNow: Date = addMinutes(actualDate, 20);
  return { code, expires: twentyFromNow };
}
