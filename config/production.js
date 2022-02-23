const fs = require('fs');

module.exports = {
  https: {
    enabled: true,
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem'),
  },
  shutdown: {
    appKill: 30000,
    serverClose: 15000,
  },
};
