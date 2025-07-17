import { Request, Response, NextFunction } from "express";
import { v4 } from "uuid";
const addRequestId = (req: Request, res: Response, next: NextFunction) => {
  res.setHeader("x-request-id", v4());
  next();
};

export default addRequestId;
