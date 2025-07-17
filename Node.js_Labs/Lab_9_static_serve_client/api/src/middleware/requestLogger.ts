import { Request, Response, NextFunction } from "express";

const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  const startTime = Date.now();
  console.log(`Request Started ${new Date().toISOString()} => ${req.url}`);

  res.on("finish", () => {
    const duration = Date.now() - startTime;
    console.log(
      `Request Finished ${new Date().toISOString()} => ${
        req.url
      }, duration: ${duration}ms`
    );
  });

  next();
};

export { requestLogger };
