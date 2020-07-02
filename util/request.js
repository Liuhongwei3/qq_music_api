const axios = require('axios');

const instance = axios.create({
  headers: {
    // referer: 'https://c.y.qq.com/',
    // host: 'c.y.qq.com'
  },
  timeout: 3000
});

const createRequest = url => {
  return instance.get(url)
}

module.exports = createRequest