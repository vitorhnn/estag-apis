import express from "express";
import routes from "./routes-v1.mjs";

const server = express();

server.use(express.json());

server.use(routes);

server.listen(3000);
