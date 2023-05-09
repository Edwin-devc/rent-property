const http = require('http');

const routes = {
    '/': function index (request, response) {
            response.writeHead(200);
            response.end('Hello you are home.');
        },
    '/foo': function foo(request, response) {
            response.writeHead(200);
            response.end("We are here at the foo page");
        }
}

http.createServer((request, response) => {
    if (request.url in routes) {
        return routes[request.url](request, response);
    } else {
        response.writeHead(404);
        response.end(http.STATUS_CODES[404]);
    }
}).listen(5000);