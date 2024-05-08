import express from "express";
import { create, getDetail, getAll, update, getOrdersByCustomer, getOrdersByRestaurant } from "../controllers/order.controller.js";
const router = express.Router();


router.get('/get-all', getAll);
router.get('/:id', getDetail);
router.post('/', create);
router.put('/:id', update);
router.get('/customer-orders/:id', getOrdersByCustomer);
router.get('/restaurant-orders/:id', getOrdersByRestaurant);

export const orderRoutes = router;
