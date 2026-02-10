const express = require('express'); 
const session = require('express-session');
const app = express();

require('dotenv').config(); 
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.json())
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

const userRoutes = require('./routes/userRoutes'); 
app.use('/users', userRoutes);