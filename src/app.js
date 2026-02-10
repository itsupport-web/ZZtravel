const express = require('express'); 
const session = require('express-session');
const app = express();
const path = require('path');
require('dotenv').config(); 
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

const userRoutes = require('./route/userRoutes'); 
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home/index.html'));
});

app.get(['/home','/home/index.html'], (req, res)=> {
  res.redirect("/");
})
app.use(express.static("public"));
app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});