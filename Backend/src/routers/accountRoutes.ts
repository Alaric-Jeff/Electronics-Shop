import DeleteAccountController from "../controllers/accountController/DeleteAccountController.js";
import UpdatePassword from "../services/accountServices/UpdatePassword.js";

import express, { RequestHandler } from "express";
const router = express.Router();

router
  .delete("/delete-account", DeleteAccountController as unknown as RequestHandler)
  .put("/update-password", UpdatePassword as unknown as RequestHandler);

export default router;