import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import methods from "micro-method-router";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    res.send({ message: "hola que tal" });
  },
});
