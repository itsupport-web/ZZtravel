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
  res.status(404).sendFile(path.join(__dirname, '../public', 'notfound.html'));
});

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});

const AWS = require("aws-sdk");

const s3 = new AWS.S3({
  endpoint: "https://s3.eu-central-003.backblazeb2.com",
  accessKeyId: "e3fd42152059",
  secretAccessKey:"K006eUm3sfvLtg/Jip4kWwV+j3xYDRg",
});

const filePath = "/images/about-team.png"; // <-- your absolute path

const file = await fetch(new URL("./images/about-team.png", import.meta.url));
const blob = await file.blob();

const params = {
  Bucket: "zzdbimg",
  Key: "test-image.jpg",          // name to use in B2
  Body: blob, // read file directly
  ContentType: "image/jpeg",
};

// Upload the file
s3.upload(params, (err, data) => {
  if (err) {
    console.error("Upload failed:", err);
  } else {
    console.log("Upload successful!");
    console.log("File URL:", data.Location);
  }
});