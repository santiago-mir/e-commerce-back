import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getAllIds, getProducts } from "controllers/products";

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const products = await getAllIds();
    res.send(products);
  },
});

export default handler;
