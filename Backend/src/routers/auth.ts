import SignUpController from "../controllers/SignUpController.js";
import LoginController from "../controllers/SignInController.js";
import express, { RequestHandler } from "express";

const router = express.Router();    

router
  .post("/signup", SignUpController as unknown as RequestHandler)
  .post("/login", LoginController as unknown as RequestHandler);

export default router;