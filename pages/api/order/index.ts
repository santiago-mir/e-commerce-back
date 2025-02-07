import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware, querySchemaMiddleware } from "lib/middlewares";
import methods from "micro-method-router";
import type { userData } from "types";
import { generateOrder } from "controllers/orders";
import { object, string } from "yup";
let productIdSchema = object({
  productId: string().required(),
})
  .noUnknown()
  .strict();

const handler = methods({
  async post(req: NextApiRequest, res: NextApiResponse, payLoad: userData) {
    try {
      const { productId } = req.query;
      const userId = payLoad.userData.id;
      const response = await generateOrder(productId as string, userId);
      res.send({ response });
    } catch (err) {
      res.status(400).send({ error_message: err });
    }
  },
});

export default querySchemaMiddleware(productIdSchema, authMiddleware(handler));
