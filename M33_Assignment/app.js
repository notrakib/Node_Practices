const http = require("http");
const Routes = require("./Routes");

const server = http.createServer(Routes);

server.listen(3000);
