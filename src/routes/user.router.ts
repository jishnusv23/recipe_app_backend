import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router();
const userController = new UserController();

router.post("/", userController.createUser.bind(userController));
router.post(
  "/google-auth",
  userController.createUserGoogle.bind(userController)
);

router.post("/login", userController.userLogin.bind(userController));
router.get("/getUser", userController.getUserData.bind(userController));
export default router;
