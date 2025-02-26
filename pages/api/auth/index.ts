import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { authUser } from "controllers/users";
import { object, string } from "yup";
import { bodySchemaMiddleware } from "lib/middlewares";
let authBodySchema = object({
  email: string().email().required(),
  userName: string().notRequired(),
});
const handler = methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email, userName } = req.body;
      const response = await authUser(email, userName);
      res.status(200).send({
        message: "User found or created",
        res: response.message,
      });
    } catch (e) {
      res.status(400).send({ error_message: e });
    }
  },
});

export default bodySchemaMiddleware(authBodySchema, handler);
