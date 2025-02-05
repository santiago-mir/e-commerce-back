import type { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { decode } from "lib/jwt";
import { JwtPayload } from "jsonwebtoken";

export function authMiddleware(callback) {
  return function (req: NextApiRequest, res: NextApiResponse) {
    const token = parseToken(req);
    if (!token) {
      res.status(401).send({ message: "no hay token" });
    }
    const decodedToken = decode(token);
    if (decodedToken) {
      callback(req, res, decodedToken as JwtPayload);
    } else {
      res.status(401).send({ message: "token incorrecto" });
    }
  };
}

export function bodySchemaMiddleware(schema, callback) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      await schema.validate(req.body);
      callback(req, res);
    } catch (err) {
      res.status(400).send({
        message: "information missing",
        err,
      });
    }
  };
}
