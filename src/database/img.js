const B2 = require('backblaze-b2');

const b2 = new B2({
  accountId: 'YOUR_KEY_ID',        // from step 3
  applicationKey: 'YOUR_APP_KEY',  // from step 3
});

async function uploadFile() {
  await b2.authorize(); // authorizes session

  // Upload file
  const response = await b2.uploadFile({
    bucketId: 'YOUR_BUCKET_ID',  // find in Buckets → Bucket Settings
    fileName: 'example.jpg',     // name in B2
    data: require('fs').readFileSync('./local-file.jpg'), // local file
  });

  console.log('File uploaded:', response.data.fileName);
}

uploadFile();