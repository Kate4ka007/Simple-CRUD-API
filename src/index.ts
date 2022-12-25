import { analytics } from "./modules/analytics.js";
import http from 'http';
import { requestHandler } from "./modules/routes.js";

const message = 'Hello Node!';
console.log(message);
analytics('index.ts!');
const PORT = process.env.PORT || 5000;

const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});