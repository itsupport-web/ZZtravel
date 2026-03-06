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

const eventRoutes = require('./route/eventRoutes'); 
app.use('/event', eventRoutes);

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

app.use((res) => {
  res.status(404).sendFile(path.join(__dirname, '../public', 'notfound.html'));
});

app.listen(3000, () => {
  console.log(`Server running on port ${3000}`);
});

const B2 = require('backblaze-b2');
const fs = require('fs');
//https://f000.backblazeb2.com/file/<bucket-name>/<file-name>
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

  console.log('File uploaded:', response.data.fileId);
}


//uploadFile("1e736fcdf4a2a1d592c00519", path.join(__dirname, '..', 'public', 'images', 'about-goals.png'));

app.get('/images/:filename', async (req, res) => {
  const fileName = `user-uploads/${req.params.filename}`;
  await b2.authorize();

  try {
    const file = await b2.downloadFileByName({
      bucketName: 'my-private-bucket',
      fileName,
    });
    res.set('Content-Type', file.headers['content-type'] || 'image/png');
    res.send(file.data);

  } catch (err) {
    res.status(404).send('Image not found');
  }
});

async function deleteFile() {
  try {
    await b2.authorize();

    // Step 1: Get the file info to find its fileId
    const bucketId = '1e736fcdf4a2a1d592c00519';
    const fileName = 'about-goals.png';

    const files = await b2.listFileNames({
      bucketId,
      prefix: fileName
    })
    const file = files.data.files.find(f => f.fileName === fileName);

    if (!file) {
      console.log('File not found');
      return;
    }

    // Step 2: Delete the file
    await b2.deleteFileVersion({
      fileId: file.fileId,
      fileName: file.fileName
    });

    console.log('File deleted successfully:', fileName);

  } catch (err) {
    console.error('Error deleting file:', err);
  }
}

//deleteFile();