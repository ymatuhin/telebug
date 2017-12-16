const https = require('https');

export default (url, params) => {
  const [host, path] = url.slice(8).split('.org');

  const postData = JSON.stringify(params);

  const options = {
    hostname: host + '.org',
    path,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Content-Length': postData.length,
    },
  };

  const req = https.request(options);
  req.write(postData);
  req.end();
};
