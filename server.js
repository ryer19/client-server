const http = require("http");
const fs = require("fs");
const url = require("url");
const bello = {
  name: "Bob",
  favorite: 2
};
const jello = {
  name: "Berry",
  favorite: 30
};
http
  .createServer(function (req, res) {
    const { method, headers } = req;
    const { accept } = headers;
    const { cookie } = headers;
    console.log(cookie)
    console.log('----------------')
    console.log(`headers: ${JSON.stringify(headers)}`);
    const urlParse = url.parse
    const pathname = url.parse(req.url).pathname;
    const userAgent = headers['user-agent']

    if (req.url === '/favicon.ico') {
      res.writeHead(200, {
        'Content-Type': 'image/x-icon'
      });
      res.end();
      console.log('favicon requested');
      return;
    }
    // if (pathname !== "/") {
    //   console.log('bello');
    //   res.write(bello.favorite.toString());
    //   bello.favorite += 1;
    //   res.end();
    //   return;
    // } else if (pathname == "/") {
    //   console.log('jello')
    //   res.write(jello.favorite.toString());
    //   jello.favorite += 10;
    // }
    if (pathname === '/') {
      if (!userAgent) {
        console.log('hello CL Client')
        res.end('CL end')
      } else {
        if (!cookie) {
          res.end('please log in first')
        } else {
          res.end(cookie)
        }
        // res.setHeader('Set-Cookie', 'abc123')
        console.log('hello browser')
        // res.end('browser end')
      }
    }
    res.end();
  })
  .listen(8082);
