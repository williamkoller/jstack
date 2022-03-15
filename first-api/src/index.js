const http = require('http');
const routes = require('./routes');

const server = http.createServer((request, response) => {
  const method = request.method;
  const endpoint = request.url;

  console.log(`Request method: ${method} | Endpoint : ${endpoint}`);

  const route = routes.find((routeObj) => {
    routeObj.endpoint === endpoint && routeObj.method === method;
  });

  if (route) {
    route.handler(request, response);
  } else {
    response.writeHead(404, {
      'Content-type': 'text/html',
    });
    response.end(`Cannot ${method} ${endpoint}`);
  }
});

const port = 3000;

server.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);
