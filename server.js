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

const getLogIn = (callback) => {
  console.log('in getLogIn')
  fs.readFile('./login.html', (err, content) => {
    if (err) {
      console.log(err)
    }
    let body = []
    body = content.toString();
    console.log(`body: ${body}`)
    callback(body);
  });
}

http
  .createServer(function (req, res) {
    const { method, headers } = req;
    const { accept } = headers;
    const { cookie } = headers;

    console.log('----------------')
    console.log(cookie)
    console.log(`headers: ${JSON.stringify(headers)}`);

    const pathname = url.parse(req.url).pathname;
    const userAgent = headers['user-agent']
    const contentType = 'text/html';

    switch (pathname) {
      case '/favicon.ico':
        console.log('favicon requested');
        return;
      case '/login':
        if (method === 'GET') {
          res.writeHead(200, { 'Content-Type': contentType })
          console.log('login ' + method)
          getLogIn((body) => {
            console.log('back into it: ' + body)
            res.end(body)
          });
        } else if (method === 'POST') {
          console.log('you have received a POST')
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });
          req.on('end', () => {
            console.log(body);
            res.end('ok');
          });
          res.end('logged in');
        }
        break;
      case '/':
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
    // if (req.url === '/favicon.ico') {
    //   res.writeHead(200, {
    //     'Content-Type': 'image/x-icon'
    //   });
    //   res.end();
    //   console.log('favicon requested');
    //   return;
    // }


    // if (pathname === '/') {
    //   if (!userAgent) {
    //     console.log('hello CL Client')
    //     res.end('CL end')
    //   } else {
    //     if (!cookie) {
    //       res.end('please log in first')
    //     } else {
    //       res.end(cookie)
    //     }
    //     // res.setHeader('Set-Cookie', 'abc123')
    //     console.log('hello browser')
    //     // res.end('browser end')
    //   }
    // }
    // res.end();
  })
  .listen(8082);
