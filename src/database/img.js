const B2 = require('backblaze-b2');
const b2 = new B2({
  applicationKeyId: 'e3fd42152059',
  applicationKey: '006b79c98f8137d8bcd9be03b8c195f1897a2839fa'      // B2_APPLICATION_KEY
});

module.exports = b2;
