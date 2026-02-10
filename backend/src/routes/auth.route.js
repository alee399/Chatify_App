import express from "express";
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("signup endpoints");
});
router.get("/login", (req, res) => {
  res.send("login endpoints");
});
router.get("/logout", (req, res) => {
  res.send("logout endpoints");
});

export default router;
