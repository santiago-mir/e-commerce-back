import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import methods from "micro-method-router";
import { sequelize } from "db/sequelize";
import { User, Auth, Order } from "models/models";
User.sync();
Auth.sync();
Order.sync();
export default methods({
  async get(req: NextApiRequest, res: NextApiResponse, token) {
    res.send({ message: "hola que tal" });
  },
});
