import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
import { getCodeStatus } from "controllers/auth";
import methods from "micro-method-router";
import { findUserByEmail } from "controllers/users";
export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { email, code } = req.body;
    const codeIsValid: boolean = await getCodeStatus(email, code);
    if (codeIsValid) {
      const userData = await findUserByEmail(email);
      const token = generate({ userData });
      res.send({ token });
    } else {
      res.status(401).send({ message: "el token es incorrecto o ha expirado" });
    }
  },
});
