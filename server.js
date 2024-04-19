import express from 'express';
import { connectDB } from './configs/mongoose.js';
const port = 3000

const bootServer = () => {
  const app = express()

  app.use(express.json())

  app.get('/', (req, res) => {
    res.send('Hello World! `12')
  })
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}

connectDB()
  .then(() => console.log('Connected successfully!'))
  .then(() => bootServer())
  .catch(error => {
    console.error(error)
    process.exit(1)
  });
