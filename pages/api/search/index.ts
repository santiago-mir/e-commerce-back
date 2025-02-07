import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getLimitAndOffset } from "lib/requests";
import { getProducts } from "controllers/products";
import { object, string } from "yup";
import { querySchemaMiddleware } from "lib/middlewares";

let querySchema = object({
  q: string().notRequired(),
  limit: string().notRequired(),
  offset: string().notRequired(),
})
  .noUnknown()
  .strict();

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { limit, offset } = getLimitAndOffset(req, 100, 19);
    const query = req.query.q as string;
    const products = await getProducts(query, limit, offset);
    res.send(products);
  },
});

export default querySchemaMiddleware(querySchema, handler);
