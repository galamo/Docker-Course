import express from "express";
const router = express.Router();
// validations
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

function signJWT(userpayload: { userName: string }) {
  const token = jwt.sign(
    { username: userpayload, permissions: "Admin", ua: "a" },
    process.env.JWT_SECRET as string,
    { expiresIn: "1h" }
  );
  return token;
}

router.post("/", (req, res, next) => {
  try {
    const data = req.body;
    console.log(data);
    if (!data.userName || !data.password)
      throw new Error("Error missing passwrod/username");
    const token = signJWT(data.userName);
    res.setHeader("Authorization", token).json({ message: "ok" });
  } catch (error) {
    return next(error);
  }
});

router.get("/info", (req, res, next) => {
  res.json({ message: "ok" });
});

export default router;
