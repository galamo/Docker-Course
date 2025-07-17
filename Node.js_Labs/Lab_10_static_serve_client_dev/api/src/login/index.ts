import express from "express";
const router = express.Router();

router.post("/", (req, res, next) => {
  res.json({ message: "ok" });
});

router.get("/info", (req, res, next) => {
  res.json({ message: "ok" });
});

export default router;
