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

const B2 = require('backblaze-b2');
const fs = require('fs');
//https://f000.backblazeb2.com/file/<bucket-name>/<file-name>
const b2 = new B2({
  applicationKeyId: 'e3fd42152059',
  applicationKey: '006b79c98f8137d8bcd9be03b8c195f1897a2839fa'      // B2_APPLICATION_KEY
});

async function uploadFile(bucketId, filePath) {
  await b2.authorize();
  // Step 1: Get upload URL
  const uploadUrlResponse = await b2.getUploadUrl({ bucketId });
  const { uploadUrl, authorizationToken } = uploadUrlResponse.data;

  // Step 2: Upload the file
  const fileData = fs.readFileSync(filePath);
  const fileName = filePath.split('/').pop();

  const response = await b2.uploadFile({
    uploadUrl,
    uploadAuthToken: authorizationToken,
    fileName,
    data: fileData
  });

  console.log('File uploaded:', response.data.fileName);
}


uploadFile("1e736fcdf4a2a1d592c00519", 'images/about-goals.png');