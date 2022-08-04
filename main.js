import cors from "cors";
import express from "express";
import { graphql } from "msw";
import { createMiddleware } from "@mswjs/http-middleware";

const server = express();
server.use(cors());
server.use(express.json());
server.use(
  createMiddleware(
    graphql.query("Ping", (req, res, ctx) => {
      return res(
        ctx.data({
          ping: "pong",
        })
      );
    })
  )
);

server.use((req, res) => {
  // eslint-disable-next-line
  console.error(`Mock for ${req.body?.operationName} not found`);
  res
    .status(404)
    .send({ error: `Mock for ${req.body?.operationName} not found` });
});

server.listen(8080, () => {
  // eslint-disable-next-line
  console.log("Mock API server running at localhost:8080");
});
