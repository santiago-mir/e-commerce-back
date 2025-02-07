import methods from "micro-method-router";
import { getSingleProduct } from "controllers/products";
import type { NextApiRequest, NextApiResponse } from "next";
import { object, string } from "yup";
import { querySchemaMiddleware } from "lib/middlewares";

let productIdSchema = object({
  productId: string().required(),
})
  .noUnknown()
  .strict();

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    try {
      const productId = req.query.productId as string;
      const response = await getSingleProduct(productId);
      res.status(200).json(response);
    } catch (err) {
      res.status(400).json({ error_message: err });
    }
  },
});

export default querySchemaMiddleware(productIdSchema, handler);
