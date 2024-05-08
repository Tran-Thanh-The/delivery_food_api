import express from "express";
import { create, getAll, getDetail, update } from "../controllers/restaurant.controller.js";
const router = express.Router();


router.get('/get-all', getAll);
router.get('/:id', getDetail);
router.post('/', create);
router.put('/:id', update);

export const restaurantRoutes = router;
