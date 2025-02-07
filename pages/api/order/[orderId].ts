import methods from "micro-method-router";
import { getSingleOrder } from "controllers/orders";
import type { NextApiRequest, NextApiResponse } from "next";
import { object, string } from "yup";
import { querySchemaMiddleware } from "lib/middlewares";

let getOrderSchema = object({
  orderId: string().required(),
})
  .noUnknown()
  .strict();

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    try {
      const orderId = req.query.orderId as string;
      const orderData = await getSingleOrder(orderId);
      res.status(200).json(orderData);
    } catch (err) {
      res.status(400).send({ message_error: err });
    }
  },
});

export default querySchemaMiddleware(getOrderSchema, handler);
