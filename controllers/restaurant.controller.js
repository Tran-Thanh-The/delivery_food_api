import { RestaurantModel } from "../models/restaurant.model.js";

async function create(req, res) {
  try {
    const data = req.body;
    const result = await RestaurantModel.createNew(data);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getAll(req, res) {
  const result = await RestaurantModel.getAll();
  res.send(result);
}

async function getDetail(req, res) {
  const { id } = req.params;
  const result = await RestaurantModel.getOne(id);
  res.send(result);
}

async function update(req, res) {
  const { id } = req.params;
  const data = req.body; 
  const result = await RestaurantModel.update(id, data);
  res.send(result);
}

export {
  getAll,
  getDetail,
  create,
  update,
};