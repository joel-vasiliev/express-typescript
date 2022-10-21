import { NextFunction, Request, Response } from "express";

import { AppError } from "@shared/errors/AppError";

const errors = (
  err: Error,
  req: Request,
  response: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  if (err instanceof SyntaxError) {
    return response
      .status(400)
      .json({ status: "SyntaxError", message: err.message });
  }

  console.log(err);

  return response.status(500).json({
    status: "Error",
    message: "Internal server errors",
  });
};

export default errors;
