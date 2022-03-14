const http = require('http');

const users = require(`./mocks/users`);

const server = http.createServer((req, res) => {
  const method = req.method;
  const url = req.url;
  const statusCodeOK = 200;
  const statusCodeNOTFOUND = 404;

  console.log(`Request method: ${method} | Endpoint : ${url}`);

  if (url === '/users' && method === 'GET') {
    res.writeHead(statusCodeOK, {
      'Content-type': 'application/json',
    });
    res.end(JSON.stringify(users));
  } else {
    res.writeHead(statusCodeNOTFOUND, {
      'Content-type': 'text/html',
    });
    res.end(`Cannot ${method} ${url}`);
  }
});

const port = 3000;

server.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);
