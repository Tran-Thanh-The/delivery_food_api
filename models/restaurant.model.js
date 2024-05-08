import { getDB } from '../configs/mongoose.js';
import { ObjectId } from 'mongodb';

const restaurantCollectionName = 'restaurants';

const getAll = async (filter = {}) => {
  try {
    const result = await getDB().collection(restaurantCollectionName).find({ ...filter }).toArray()
    console.log("LOG: GET_ALL -> result", result);
    return result;
  } catch (error) {
    throw new Error(error)
  }
}

const getOne = async (id) => {
  try {
    const restaurant = await getDB().collection(restaurantCollectionName).findOne({ _id: ObjectId(id) });
    return restaurant;
  } catch (error) {
    throw new Error(error)
  }
}

const createNew = async (data) => {
  try {
    const defaulValue = {
      address: "",
      email: "",
      password: "",
      genre: "Việt Nam",
      imgUrl: "https://images.foody.vn/res/g1/8887/prof/s576x330/foody-mobile-0drisngl-jpg-612-635781077873801273.jpg",
      rating: 5,
      short_description: "",
      title: "",
      phone_number: ""
    }
    const insertValue = {
      ...defaulValue,
      ...data
    }
    console.log("LOG: CREATE_NEW -> insertValue", insertValue);

    const restaurant = await getDB().collection(restaurantCollectionName).insertOne(insertValue)

    console.log("LOG: CREATE_NEW -> restaurant", insertValue);
    return restaurant;
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (id, data) => {
  try {
    const updateData = { ...data }

    await getDB().collection(restaurantCollectionName).findOneAndUpdate(
      { _id: ObjectId(id) },
      { $set: updateData },
      { returnOriginal: false }
    )

    return await getOne(id)
  } catch (error) {
    throw new Error(error)
  }
}

export const RestaurantModel = {
  createNew,
  update,
  getAll,
  getOne,
  restaurantCollectionName
}
