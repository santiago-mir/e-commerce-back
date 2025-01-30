import type { NextApiRequest, NextApiResponse } from "next";
import methods from "micro-method-router";
import { getLimitAndOffset } from "lib/requests";
import { getProducts } from "controllers/products";
export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const { limit, offset } = getLimitAndOffset(req, 100, 19);
    const query = req.query.q as string;
    try {
      const products = await getProducts(query, limit, offset);
      res.send(products);
    } catch (err) {}
    res.status(400).send({ message: query });
  },
});
