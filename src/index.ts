import { analytics } from "./modules/analytics.js";
import { users } from "./modules/data.js";
import http from 'http';
import { Controller } from "./models/controller.js";
import { validateId } from "./modules/validateId.js";

const message = 'Hello Node!';
console.log(message);
analytics('index.ts!');




const PORT = process.env.PORT || 5000;

const server = http.createServer(async (req, res) => {
  const persons = new Controller(users);
  const url = req.url as string;
  const id = url.split("/")[3];
  if (url === "/api/users") {

    switch (req.method) {
      case "GET":
        res.writeHead(200, { "Content-Type": "application/json" });
        res.write(JSON.stringify(await persons.getUsers()));
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
          res.end(JSON.stringify(await persons.removeUser(id)));
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
});

server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});