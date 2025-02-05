import type { NextApiRequest, NextApiResponse } from "next";
import type { userData } from "types";
import { authMiddleware, bodySchemaMiddleware } from "lib/middlewares";
import { updateUserAdress } from "controllers/users";
import methods from "micro-method-router";
import { object, string } from "yup";

let addressBodySchema = object({
  address: string().required(),
})
  .noUnknown()
  .strict()
  .test(
    "body not empty",
    "El body no puede estar vacio",
    (body) => Object.keys(body).length > 0
  );

const handler = methods({
  async patch(req: NextApiRequest, res: NextApiResponse, payLoad: userData) {
    const { address } = req.body;
    const userId: number = payLoad.userData.id;
    const response = await updateUserAdress(userId, address);
    res.send(response);
  },
});

export default bodySchemaMiddleware(addressBodySchema, authMiddleware(handler));
