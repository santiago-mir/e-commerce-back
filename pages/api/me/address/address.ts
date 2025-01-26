import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import methods from "micro-method-router";
import { sequelize } from "db";
import { User, Auth } from "models/models";
export default methods({
  async patch(req: NextApiRequest, res: NextApiResponse, token) {
    res.send({ message: "update address del user" });
  },
});
