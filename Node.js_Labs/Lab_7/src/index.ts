import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use((req, res, next) => {
  console.log(`Request Started ${new Date().toISOString()} => ${req.url}`);
  next();
});

app.get("/health-check", function (_, res) {
  // @ts-ignore
  a;
  res.send(`Api is Healthy ${new Date().toISOString()}`);
});

app.use((error: any, req: any, res: any, next: any) => {
  console.log(error);
  res.status(500).send("Something went wrong, Nissan is working to fix it");
});

app.listen(process.env.PORT, () => {
  console.log(`Api is running on port ${process.env.PORT}`);
});
