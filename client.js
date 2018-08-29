//https:www.tutorialspoint.com/nodejs/nodejs_web_module.htm
const http = require("http");

// Options to be used by request
const options = {
  host: "localhost",
  port: "8082",
  path: "/",
  method: "GET",
  headers: {
    accept: "text/html",
    "accept-language": "en-US"
  }
};

// Callback function is used to deal with response
const callback = function (response, error) {
  // Continuously update stream with data
  if (error) {
    console.log(error)
  }
  let body = "";
  response.on("data", function (data) {
    body += data;
  });

  response.on("end", function () {
    // Data received completely.
    console.log(body);
  });
};
// Make a request to the server
const req = http.request(options, callback);
req.end();
