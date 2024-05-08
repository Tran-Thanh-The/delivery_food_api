import { getDB } from '../configs/mongoose.js';
import { ObjectId } from 'mongodb';

const orderCollectionName = 'orders';

const getAll = async (filter = { employeeId: "" }) => {
  try {
    const result = await getDB().collection(orderCollectionName).find({ ...filter, _destroy: false }).toArray()
    return result
  } catch (error) {
    throw new Error(error)
  }
}

const getOne = async (id) => {
  try {
    const order = await getDB().collection(orderCollectionName).findOne({ _id: ObjectId(id) });
    const order_items = await getDB().collection('order_items').find({ orderId: ObjectId(id) }).toArray()
    return {
      ...order,
      dishes: order_items
    };
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const defaulInvoiceData = {
      created_at: new Date(),
      restaurantId: "1",
      customerId: "2",
      address: "62 Đã sĩ - Kiến Hưng - Hà Đông",
      phone_number: "0989897689",
      discount: "10000",
      total_price: "200000",
      completed_price: "172000",
      discountId: "1",
      discount_level: "12000",
      status: "PENDING",
      payment_method: "CASH",
      dishes: []
    }
    const insertValue = {
      ...defaulInvoiceData,
      ...data
    }

    // Create order
    const {
      created_at,
      restaurantId,
      customerId,
      address,
      phone_number,
      discount,
      total_price,
      completed_price,
      discountId,
      discount_level,
      status,
      payment_method
    } = insertValue;
    const order = await getDB().collection(orderCollectionName).insertOne({
      created_at,
      restaurantId,
      customerId,
      address,
      phone_number,
      discount,
      total_price,
      completed_price,
      discountId,
      discount_level,
      status,
      payment_method
    })

    // Create order items
    const orderItems = data.dishes.map(dish => {
      return {
        orderId: order.insertedId,
        dishId: dish.dishId,
        quantity: dish.quantity,
        price: dish.price
      }
    });
    const order_items = await getDB().collection('order_items').insertMany(orderItems)

    console.log("LOG: CREATE_NEW -> order", order);
    return {
      ...order,
      dishes: order_items
    };
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }

    await getDB().collection(orderCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateData },
      { returnOriginal: false }
    )

    console.log("LOG: UPDATE -> order", updateData);
    return await getOne(id)
  } catch (error) {
    throw new Error(error)
  }
}

const getManyOrders = async (filter) => {
  try {
    const result = await getDB().collection(orderCollectionName).find(filter).toArray();

    for (let i = 0; i < result.length; i++) {
      const order_items = await getDB().collection('order_items').find({ orderId: ObjectId(result[i]._id) }).toArray();
      result[i].dishes = order_items;
    }

    return result;
  } catch (error) {
    throw new Error(error)
  }
}

const getOrdersByCustomer = async (customerId) => {
  const data = await getManyOrders({ customerId: customerId });
  return data;
}

const getOrdersByRestaurant = async (restaurantId) => {
  const data = await getManyOrders({ restaurantId: restaurantId });
  return data;
}


// const getMany = async (ids) => {
//   try {
//     const transformIds = ids.map(id => ObjectId(id))
//     const result = await getDB().collection(orderCollectionName).find({ _id: { $in: transformIds } }).toArray()
//     return result
//   } catch (error) {
//     throw new Error(error)
//   }
// }

// const deleteMany = async (ids) => {
//   try {
//     const transformIds = ids.map(id => ObjectId(id))
//     const result = await getDB().collection(orderCollectionName).updateMany(
//       { _id: { $in: transformIds } },
//       { $set: { _destroy: true } }
//     )

//     return result
//   } catch (error) {
//     throw new Error(error)
//   }
// }

export const OrderModel = {
  createNew,
  // deleteMany,
  getOrdersByCustomer,
  getOrdersByRestaurant,
  update,
  getAll,
  getOne,
  // getMany,
  orderCollectionName
}
