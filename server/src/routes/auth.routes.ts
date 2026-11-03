import { Router } from "express";
import { registration, login } from "../controllers/authController.js";
import { registrationValidator } from "../middleware/auth.validator.js";
import { handleValidation } from "../middleware/handle.validation.js";

const router = Router();

router.post("/registration", registrationValidator, handleValidation, registration);
router.post("/login", login);

export default router;