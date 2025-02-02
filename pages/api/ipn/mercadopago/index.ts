import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import methods from "micro-method-router";
import { getPaymentById, WebhokPayload } from "lib/mercadopago";
export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const payload = req.body as WebhokPayload;
    if (payload.type === "payment") {
      const mpPayment = await getPaymentById(payload.data.id);
      console.log({ mpPayment });
    }
    res.send({ message: "mercado pago" });
  },
});
