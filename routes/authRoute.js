import Express from "express";
import {
  loginController,
  registerController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewears/authMiddleware.js";
// router object
const router = Express.Router();
// router
// REGISTER || method POST
router.post("/register", registerController);
// LOGIN |POST
router.post("/login", loginController);

// test route
router.get("/test", requireSignIn, isAdmin, testController);

// ProtectedRoutes user route-auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
// ProtectedRoutes admin route-auth
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
