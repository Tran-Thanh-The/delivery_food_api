import { OrderModel } from "../models/order.model.js";

async function create(req, res) {
  try {
    const data = req.body;
    const result = await OrderModel.createNew(data);
    res.send(result);
  } catch (error) {
    res.status(400).send(error);
  }
}

async function getAll(req, res) {
  const result = await OrderModel.getAll();
  res.send(result);
}

async function getOrdersByCustomer(req, res) {
  const { id } = req.params;
  const result = await OrderModel.getOrdersByCustomer(id);
  res.send(result);
}

async function getOrdersByRestaurant(req, res) {
  const { id } = req.params;
  const result = await OrderModel.getOrdersByRestaurant(id);
  res.send(result);
}

async function getDetail(req, res) {
  const { id } = req.params;
  const result = await OrderModel.getOne(id);
  res.send(result);
}

async function update(req, res) {
  const { id } = req.params;
  const data = req.body;
  const result = await OrderModel.update(id, data);
  res.send(result);
}

// async function getMany(req, res) {
//   const { invoiceIds } = req.body;
//   console.log(invoiceIds);
//   const result = await InvoiceModel.getMany(invoiceIds);
//   res.send(result);
// }

export {
  getAll,
  getDetail,
  create,
  update,
  getOrdersByCustomer,
  getOrdersByRestaurant
  // getMany
};