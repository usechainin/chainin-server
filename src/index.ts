import express from "express";
import { json, urlencoded } from "body-parser";
import cors from "cors";
import { expressjwt as jwt } from "express-jwt";
import v1 from "./v1";

const secret = process.env.JWT_SECRET || "my-secret";

const app = express();
const appPort = process.env.PORT || 3050;

const jwtMiddleware = jwt({
  secret: secret,
  algorithms: ["HS256"],
}).unless({
  path: ["/v1/user"],
  method: ["POST", "GET", "PUT", "DELETE"],
});

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,PUT,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

app
  .use(
    json({ limit: "5mb" }),
    jwtMiddleware,
    cors(corsOptions),
    urlencoded({ extended: true }),
    v1
  )
  .set("trust proxy", true);

console.log(
  `\n\nIF THIS THROWS AN ERROR -\nMAKE SURE YOU ARE ALLOWED TO OPEN PORT ${appPort} !\n\n`
);

app.listen(appPort);
