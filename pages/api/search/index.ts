import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getLimitAndOffset } from "lib/requests";
import { sequelize } from "db/sequelize";
import { User, Auth } from "models/models";
export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { limit, offset } = getLimitAndOffset(req, 100, 19);
    const query = req.query.q as string;
    res.send({ message: query });
  },
});
