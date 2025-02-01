import type { NextApiRequest, NextApiResponse } from "next";
import type { userData } from "types";
import { authMiddleware } from "lib/middlewares";
import { updateUserData } from "controllers/users";
import methods from "micro-method-router";

const handler = methods({
  async get(req: NextApiRequest, res: NextApiResponse, payLoad: userData) {
    res.status(200).send({ ...payLoad.userData });
  },
  async patch(req: NextApiRequest, res: NextApiResponse, payLoad: userData) {
    const fields = req.body.fields;
    const currentEmail = payLoad.userData.email;
    const response = await updateUserData(currentEmail, fields);
    if (response) {
      res.send({ message: "user data updated successfully", data: response });
    } else {
      res.status(400).send({ message: "error updating user data" });
    }
  },
});

export default authMiddleware(handler);
