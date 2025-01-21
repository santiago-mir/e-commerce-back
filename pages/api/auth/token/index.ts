import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
import { getCodeStatus } from "lib/controllers/auth";
import methods from "micro-method-router";
export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { email, code } = req.body;
    const userData = await getCodeStatus(email, code);
    if (userData) {
      const token = generate({
        userId: userData.userId,
        email: userData.userEmail,
      });
      res.send(token);
    } else {
      res.status(401).send({ message: "el token es incorrecto o ha expirado" });
    }
  },
});
