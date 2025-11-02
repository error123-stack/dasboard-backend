const express = require('express');
const cors = require('cors');
require('dotenv').config();

const restaurantsRouter = require('./routes/restaurants');
const menuRouter = require('./routes/menu');
const ordersRouter = require('./routes/orders');
const usersRouter = require('./routes/users');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({
    message: 'Food Delivery Admin Panel API',
    version: '1.0.0',
    endpoints: {
      restaurants: '/api/restaurants',
      menu: '/api/menu',
      orders: '/api/orders',
      users: '/api/users'
    }
  });
});

app.use('/api/restaurants', restaurantsRouter);
app.use('/api/menu', menuRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/users', usersRouter);

app.use(errorHandler);

module.exports = app;
