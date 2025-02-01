import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import methods from "micro-method-router";
import type { userData } from "types";
import { generateOrder } from "controllers/orders";
const handler = methods({
  async post(req: NextApiRequest, res: NextApiResponse, payLoad: userData) {
    const { productId } = req.query;
    const userId = payLoad.userData.id;
    const response = await generateOrder(productId as string, userId);
    res.send({ response });
  },
});

export default authMiddleware(handler);
