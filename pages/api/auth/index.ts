import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { findOrCreateUser } from "controllers/users";
export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email, userName } = req.body;
      const response = await findOrCreateUser(email, userName);
      res.status(200).send({
        message: "User found",
        res: response.message,
      });
    } catch (e) {
      res.status(400).send({ message: e });
    }
  },
});
