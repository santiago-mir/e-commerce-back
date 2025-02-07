import type { NextApiRequest, NextApiResponse } from "next";
import { getAllOrders } from "controllers/orders";
import methods from "micro-method-router";
import { userData } from "types";
import { authMiddleware } from "lib/middlewares";

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse, payLoad: userData) {
    const userId = payLoad.userData.id;
    const response = await getAllOrders(userId);
    res.send({ response: response });
  },
});

export default authMiddleware(handler);
