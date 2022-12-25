import http from 'http';
import { Controller } from '../models/controller.js';
import { validateId } from './validateId.js';

export const requestHandler = async (req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage>) => {
  const persons = Controller.getInstance();
  const url = req.url as string;
  const method = req.method;
  const id = url.split("/")[3];
  if (url === "/api/users") {

    switch (method) {
      case "GET":
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(persons.getUsers()));
        res.end();
        break;
      case "POST":
        res.writeHead(201, { "Content-Type": "application/json" });
        // res.write(JSON.stringify(users));
        res.end();
        break;

      default:
        break;
    }
  } else if (validateId(url)) {
    switch (req.method) {
      case "GET":
        try {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(await persons.getUser(id)));
        } catch (error) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: error }));
        }
        break;
      case "DELETE":
        try {
          res.writeHead(200, { "Content-Type": "application/json" });
          res.end(JSON.stringify(persons.removeUser(id)));
        } catch (error) {
          res.writeHead(404, { "Content-Type": "application/json" });
          res.end(JSON.stringify({ message: error }));
        }
        break;

      default:
        break;
    }


  } else if (url.match(/\/api\/users\/([0-9a-zA-Z]+)/)) {
    res.writeHead(400, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Invalid id" }));


  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
};