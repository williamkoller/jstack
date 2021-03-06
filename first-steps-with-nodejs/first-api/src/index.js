const http = require('http');
const { URL } = require('url');

const bodyParser = require('./helpers/bodyParser');
const routes = require('./routes');

const port = 3000;
const server = http.createServer((request, response) => {
  const method = request.method;
  const parsedUrl = new URL(`http://localhost:${port}${request.url}`);
  console.log(`Request method: ${method} | Endpoint : ${parsedUrl.pathname}`);

  let { pathname } = parsedUrl;

  let id = null;

  const splitEndpoint = pathname.split('/').filter(Boolean);

  if (splitEndpoint.length > 1) {
    pathname = `/${splitEndpoint[0]}/:id`;
    id = splitEndpoint[1];
  }

  const route = routes.find((routeObj) => {
    return routeObj.endpoint === pathname && routeObj.method === method;
  });

  if (route) {
    request.query = Object.fromEntries(parsedUrl.searchParams);

    request.params = { id };

    response.send = (statusCode, body) => {
      response.writeHead(statusCode, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(body));
    };

    if (['POST', 'PUT', 'PATCH'].includes(method)) {
      bodyParser(request, () => route.handler(request, response));
    } else {
      route.handler(request, response);
    }
  } else {
    response.writeHead(404, {
      'Content-type': 'text/html',
    });
    response.end(`Cannot ${method} ${pathname}`);
  }
});

server.listen(port, () =>
  console.log(`Server started at http://localhost:${port}`)
);
