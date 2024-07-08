import { Router } from "express";
import { authController } from "../controllers/auth.js";
import { authHander } from "../middleware/auth.js";
import { profileController } from "../controllers/profile.js";
import { stockController } from "../controllers/stock.js";

export const router = Router();

router.post("/register", authController.register);

router.post("/login", authController.login);

router.use(authHander);

router.get('/stock', stockController.getStock);
router.post('/stock', stockController.addStock);
router.put('/stock/:id_history', stockController.updateStock);
router.delete('/stock/:id_history', stockController.deleteStock);

router.get("/profile", profileController);