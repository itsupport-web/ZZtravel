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

const productRoutes = require('./route/productRoutes'); 
app.use('/products', productRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/home/index.html'));
});

app.get(['/home','/home/index.html'], (req, res)=> {
  res.redirect("/");
})

app.get('/about/index.html', (req, res)=> {
  res.redirect("/about");
})

app.get('/contact/index.html', (req, res)=> {
  res.redirect("/contact");
})

app.get('/events/index.html', (req, res)=> {
  res.redirect("/events");
})

app.get('/product/index.html', (req, res)=> {
  res.redirect("/product");
})

app.get('/signin/index.html', (req, res)=> {
  res.redirect("/signin");
})



app.use(express.static("public"));

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});
app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});