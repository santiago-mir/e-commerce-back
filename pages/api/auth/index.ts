import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { sendCode } from "lib/controllers/auth";
export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { email } = req.body;
    await sendCode(email);
    res.status(200).send({ message: "verification code send to user email" });
  },
});
