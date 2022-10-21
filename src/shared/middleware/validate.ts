import { NextFunction, Request, Response } from "express";
import { SchemaOf } from "yup";

export function validate(schema: SchemaOf<any>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers,
      });
      return next();
    } catch (err: any) {
      return res.status(500).json({ type: err.name, message: err.message });
    }
  };
}
