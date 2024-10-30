import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import ErrorResponse from "./errorResponse";
import { HttpStatusCode } from "../statusCode/StatusCode";

const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (err instanceof ErrorResponse) {
     res.status(err.status).json({
      success: false,
      status: err.status,
      message: err.message,
    });
  }

   res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    success: false,
    status: 500,
    message: "Internal Server Error",
  });
};

export default errorHandler as ErrorRequestHandler;
