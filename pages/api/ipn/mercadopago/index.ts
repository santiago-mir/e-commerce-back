import type { NextApiRequest, NextApiResponse } from "next";
import { confirmOrder } from "controllers/orders";
import methods from "micro-method-router";
import { getPaymentById, WebhokPayload } from "lib/mercadopago";
import { bool, number, object, string } from "yup";
import { bodySchemaMiddleware } from "lib/middlewares";

let IpnMPBodySchema = object({
  action: string().required(),
  api_version: string().required(),
  data: object({
    id: string().required(),
  }).required(),
  date_created: string().required(),
  id: number().required(),
  live_mode: bool().required(),
  type: string().required(),
  user_id: string().required(),
})
  .noUnknown()
  .strict();

const handler = methods({
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

export default bodySchemaMiddleware(IpnMPBodySchema, handler);
