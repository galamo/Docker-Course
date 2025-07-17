import { Request, Response, NextFunction } from "express";
const unsecuredHeaders = [
  "x-powered-by",
  "x-ratelimit-limit",
  "x-ratelimit-reset",
];
const secureHeaders = (req: Request, res: Response, next: NextFunction) => {
  unsecuredHeaders.forEach((item) => {
    res.removeHeader(item);
  });

  next();
};

export { secureHeaders };
