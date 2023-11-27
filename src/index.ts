import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import v1 from "./v1";
import middleware from "./v1/middleware";

// TODO: Store a better secret in a hidden config file
const secret = process.env.JWT_SECRET || "my-secret";

const app = express();
const appPort = process.env.PORT || 3050;

const jwtMiddleware = jwt({
  secret: secret,
  algorithms: ["HS256"],
}).unless({
  path: ["/v1/user", "/v1/user/login"],
  method: ["POST", "GET", "PUT", "DELETE"],
});

app
  .use(
    cors(),
    json({ limit: "5mb" }),
    jwtMiddleware,
    urlencoded({ extended: true }),
    v1
  )
  .set("trust proxy", true);

console.log(
  `\n\nIF THIS THROWS AN ERROR -\nMAKE SURE YOU ARE ALLOWED TO OPEN PORT ${appPort} !\n\n`
);

app.listen(appPort);
