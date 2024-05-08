import express from 'express';
import cors from 'cors';
import { connectDB } from './configs/mongoose.js';
import { orderRoutes } from './router/order.router.js';
import { restaurantRoutes } from './router/restaurant.router.js';
import { corsOptions } from './utilities/constant.js';
const port = 3000

const bootServer = () => {
  const app = express()

  app.use(cors())
  app.use(express.json())
  app.use('/orders', orderRoutes)
  app.use('/restaurants', restaurantRoutes)
  
  app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
}

connectDB()
  .then(() => console.log('Connected successfully!'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  });
