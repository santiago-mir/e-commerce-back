import methods from "micro-method-router";
import { getSingleOrder } from "controllers/orders";
import type { NextApiRequest, NextApiResponse } from "next";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const orderId = req.query.orderId as string;
    const orderData = await getSingleOrder(orderId);
    res.status(200).json(orderData);
  },
});
