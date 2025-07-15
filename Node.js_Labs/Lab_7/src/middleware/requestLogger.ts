import { Request, Response, NextFunction } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`Request Started ${new Date().toISOString()} => ${req.url}`);

  res.on("finish", () => {
    console.log(`Request Finished ${new Date().toISOString()} => ${req.url}`);
  });

  next();
};

export { requestLogger };
