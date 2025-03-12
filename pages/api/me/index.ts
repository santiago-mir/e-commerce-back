import type { NextApiRequest, NextApiResponse } from "next";
import type { userData } from "types";
import { authMiddleware, bodySchemaMiddleware } from "lib/middlewares";
import { updateUserData, getUserData } from "controllers/users";
import methods from "micro-method-router";
import { object, string } from "yup";
import Cors from "cors";

const cors = Cors({
  methods: ["GET", "POST", "PATCH", "OPTIONS", "HEAD"],
});

let patchBodySchema = object({
  email: string().email().notRequired(),
  name: string().notRequired(),
  address: string().notRequired(),
})
  .noUnknown()
  .strict()
  .test(
    "body not empty",
    "El body no puede estar vacio",
    (body) => Object.keys(body).length > 0
  );
function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const rawHandler = methods({
  async get(req: NextApiRequest, res: NextApiResponse, payLoad: userData) {
    const userId = payLoad.userData.id;
    const userData = await getUserData(userId);
    res.status(200).send(userData);
  },
  async patch(req: NextApiRequest, res: NextApiResponse, payLoad: userData) {
    try {
      const fields = req.body;
      const userId = payLoad.userData.id;
      const response = await updateUserData(userId, fields);
      res.send(response);
    } catch (err) {
      res.status(400).send({ message: err });
    }
  },
});

const protectedHandler = authMiddleware(rawHandler);

export default async function corsHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors);
  await methods({
    get: protectedHandler,
    patch: bodySchemaMiddleware(patchBodySchema, protectedHandler),
  });
}
