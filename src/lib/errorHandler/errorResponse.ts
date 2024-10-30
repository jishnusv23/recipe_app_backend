import { HttpStatusCode } from "../statusCode/StatusCode";

export default class ErrorResponse extends Error {
  public status: number;
  public message: string;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }

  static badRequest(msg: string): ErrorResponse {
    return new ErrorResponse(HttpStatusCode.BAD_REQUEST, msg || "Bad Request");
  }

  static unauthorized(msg: string): ErrorResponse {
    return new ErrorResponse(HttpStatusCode.UNAUTHORIZED, msg || "Unauthorized");
  }

  static forbidden(msg: string): ErrorResponse {
    return new ErrorResponse(HttpStatusCode.FORBIDDEN, msg || "Forbidden");
  }

  static notFound(msg: string): ErrorResponse {
    return new ErrorResponse(HttpStatusCode.NOT_FOUND, msg || "Not Found");
  }
  static conflict(msg: string): ErrorResponse {
    return new ErrorResponse(HttpStatusCode.CONFLICT, msg || "Conflict");
  }

  static internalError(msg: string): ErrorResponse {
    return new ErrorResponse(HttpStatusCode.INTERNAL_SERVER_ERROR, msg || "internal Server Error");
  }
}
