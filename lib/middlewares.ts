import type { NextApiRequest, NextApiResponse } from "next";
import parseToken from "parse-bearer-token";
import { decode } from "lib/jwt";
import { JwtPayload } from "jsonwebtoken";
import { AnyObject, ObjectSchema } from "yup";

export function corsMiddleware(handler: any) {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", "*"); // O especifica tu frontend: "http://localhost:3000"
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );

    // Manejar solicitudes OPTIONS (preflight)
    if (req.method === "OPTIONS") {
      return res.status(200).end();
    }

    return handler(req, res);
  };
}

export function authMiddleware(
  callback: (
    arg0: NextApiRequest,
    arg1: NextApiResponse,
    arg2: JwtPayload
  ) => void
) {
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

export function bodySchemaMiddleware(
  schema: ObjectSchema<AnyObject>,
  callback: {
    (req: NextApiRequest, res: NextApiResponse): void;
    (req: NextApiRequest, res: NextApiResponse): void;
    (arg0: NextApiRequest, arg1: NextApiResponse): void;
  }
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      await schema.validate(req.body);
      callback(req, res);
    } catch (err) {
      res.status(400).send({
        message: "body information invalid",
        err,
      });
    }
  };
}

export function querySchemaMiddleware(
  schema: ObjectSchema<AnyObject>,
  callback: (arg0: NextApiRequest, arg1: NextApiResponse) => void
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      await schema.validate(req.query);
      callback(req, res);
    } catch (err) {
      res.status(400).send({
        message: "query invalid",
        err,
      });
    }
  };
}
