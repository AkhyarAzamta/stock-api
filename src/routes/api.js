// src/routes/api.js 
import { Router } from "express";
import { authController } from "../controllers/auth.js";
import { authHandler } from "../middleware/auth.js";
import { profileController } from "../controllers/profile.js";
import { stockController } from "../controllers/stock.js";
import { itemController } from "../controllers/item.js";

export const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

router.use(authHandler);

router.get('/stock', stockController.getStock);
router.post('/stock', stockController.addStock);
router.put('/stock/:id_history', stockController.updateStock);
router.delete('/stock/:id_history', stockController.deleteStock);

router.get('/item', itemController.getItems);
router.post('/item', itemController.addItem);
router.get('/item/:id', itemController.getItemById);
router.put('/item/:id', itemController.updateItem);
router.delete('/item/:id', itemController.deleteItem);

router.get("/profile", profileController);
