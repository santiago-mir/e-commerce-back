import type { NextApiRequest, NextApiResponse } from "next";
import { generate } from "lib/jwt";
import { getCodeStatus } from "controllers/auth";
import methods from "micro-method-router";
import { findUserByEmail } from "controllers/users";
import { number, object, string } from "yup";
import { bodySchemaMiddleware } from "lib/middlewares";
let tokenSchema = object({
  email: string().email().required(),
  code: number().positive().required(),
});
const handler = methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const { email, code } = req.body;
    try {
      await getCodeStatus(email, code);
      const userData = await findUserByEmail(email);
      const token = generate({ userData });
      res.send({ token });
    } catch (err) {
      res.status(400).send({
        error_message: err,
      });
    }
  },
});

export default bodySchemaMiddleware(tokenSchema, handler);
