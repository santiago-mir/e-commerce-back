import methods from "micro-method-router";
import { getSingleProduct } from "controllers/products";
import type { NextApiRequest, NextApiResponse } from "next";

export default methods({
  async get(req: NextApiRequest, res: NextApiResponse) {
    const productId = req.query.productId as string;
    const response = await getSingleProduct(productId);
    res.status(200).json(response);
  },
});
