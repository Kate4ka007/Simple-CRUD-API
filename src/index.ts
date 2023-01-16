import http from 'http';
import { requestHandler } from "./modules/routes.js";
import dotenv from 'dotenv';
import process from "process";

dotenv.config();

export const server = http.createServer(requestHandler);
server.listen(process.env.PORT);

console.log(`server started on port: ${process.env.PORT}`);
