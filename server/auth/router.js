import { Router } from "express";
import passport from "passport";

const router = Router();

router.get("/", ({ user }, res) => {
  if (!user) return res.send(401);
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

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect(process.env.ORIGIN);
  });
});

export default router;
