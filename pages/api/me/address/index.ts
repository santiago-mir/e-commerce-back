import type { NextApiRequest, NextApiResponse } from "next";
import { authMiddleware } from "lib/middlewares";
import { updateUserAdress } from "controllers/users";
import methods from "micro-method-router";

type userData = {
  userData: {
    id: number;
    name: string;
    email: string;
    address: string | null;
  };
  iat: number;
};

const handler = methods({
  async patch(req: NextApiRequest, res: NextApiResponse, payLoad: userData) {
    const { newAddress } = req.body;
    const currentEmail = payLoad.userData.email;
    const response = await updateUserAdress(currentEmail, newAddress);
    if (response) {
      res.send({
        message: "user adrress updated successfully",
        data: response,
      });
    } else {
      res.status(400).send({ message: "error updating user data" });
    }
  },
});

export default authMiddleware(handler);
