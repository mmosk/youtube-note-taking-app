import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", ({ user }, res) => {
  if (!user) return;
  res.json({ user });
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.ORIGIN,
    failureRedirect: "/",
  })
);

export default router;
