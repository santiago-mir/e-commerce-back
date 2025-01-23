import { addMinutes } from "date-fns/addMinutes";
export function generateCodeAndExpiresDate(): {
  code: number;
  expires: Date;
} {
  const code: number = Math.floor(10000 + Math.random() * 90000);
  const now: Date = new Date();
  const twentyFromNow: Date = addMinutes(now, 20);
  return { code, expires: twentyFromNow };
}
