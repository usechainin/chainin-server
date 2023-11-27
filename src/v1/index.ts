import express, { Application } from "express";
import endpoints from "./endpoints";

const app: Application = express();

for (const key in endpoints) {
  const endpoint = endpoints[key];
  if (endpoint.middleware) {
    app[endpoint.method](endpoint.url, endpoint.middleware, endpoint.handler);
  } else {
    app[endpoint.method](endpoint.url, endpoint.handler);
  }
}

export default app;
