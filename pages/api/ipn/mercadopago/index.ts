import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { confirmOrder } from "controllers/orders";
import methods from "micro-method-router";
import { getPaymentById, WebhokPayload } from "lib/mercadopago";
export default methods({
  async post(req: NextApiRequest, res: NextApiResponse) {
    const payload = req.body as WebhokPayload;

    if (payload.type === "payment") {
      const mpPayment = await getPaymentById(payload.data.id);
      if (mpPayment.status === "approved") {
        const orderId: string = mpPayment.external_reference;
        // confirmar la compra con el order id
        try {
          const purchaseConfirmation = await confirmOrder(orderId);
          res.send({ purchaseConfirmation });
        } catch (err) {
          res.status(400).send({ error_message: err });
        }
      }
    }
  },
});
