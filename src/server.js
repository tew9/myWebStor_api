const express = require('express');
const env = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const adminRoutes = require('./routes/admin/auth')
const userRoutes = require('./routes/auth')
const categoryRoutes = require('./routes/categories');
const productRoutes = require('./routes/products')

//--no-deprecation
const app = express();

//constants
env.config();

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@webstore.9mzti.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
 {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   useCreateIndex: true
  })
  .then(() => {
    console.log("database connected!!")
  })
  .catch(err => console.log(`error happened: ${err}`)
);

//add middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api', userRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)


app.listen(process.env.PORT, () => {
  console.log(`listening from port: ${process.env.PORT}`)
});
