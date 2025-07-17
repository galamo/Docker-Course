import { Request, Response, NextFunction } from "express";

const requestStarted = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request Started ${new Date().toISOString()} => ${req.url}`);
  next();
};

export { requestStarted };
