import { Express, Request, Response } from "express";
import middleware from "./middleware";
import userHandler from "./handlers/userHandler";
import educationHandler from "./handlers/educationHandler";
import handleRootRequest from "./handlers/rootHandler";
import schoolHandler from "./handlers/schoolHandler";

type Endpoint = {
  url: string;
  method: "get" | "post" | "put" | "delete" | "patch";
  middleware: any[];
  handler: (req: Request, res: Response) => void;
  description: string;
};

const endpoints: Record<string, Endpoint> = {};

endpoints.index = {
  url: "/",
  method: "get",
  middleware: [],
  handler: handleRootRequest,
  description: "welcome",
};

/////////////////////////////////////////
///////////////// USER //////////////////
/////////////////////////////////////////

endpoints.createUser = {
  url: "/v1/user",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: userHandler.create,
  description: "create user",
};


endpoints.readUser = {
  url: "/v1/user",
  method: "get",
  middleware: [],
  handler: userHandler.read,
  description: "read all users",
};

endpoints.readUserByWalletAddress = {
  url: "/v1/user/:wallet_address",
  method: "get",
  middleware: [],
  handler: userHandler.readByWalletAddress,
  description: "read user by wallet address",
}

/////////////////////////////////////////
/////////////// EDUCATION ///////////////
/////////////////////////////////////////

endpoints.createEducation = {
  url: "/v1/education",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: educationHandler.create,
  description: "create education",
};

endpoints.readEducationByWalletAddress = {
  url: "/v1/education/:wallet_address",
  method: "get",
  middleware: [],
  handler: educationHandler.readByWalletAddress,
  description: "read education by wallet address",
}

/////////////////////////////////////////
//////////////// SCHOOL /////////////////
/////////////////////////////////////////

endpoints.createSchool = {
  url: "/v1/school",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: schoolHandler.create,
  description: "create school",
};


endpoints.readSchool = {
  url: "/v1/school",
  method: "get",
  middleware: [],
  handler: schoolHandler.read,
  description: "read all schools",
};

endpoints.readSchoolBySchoolName = {
  url: "/v1/school/:school_name",
  method: "get",
  middleware: [],
  handler: schoolHandler.readBySchoolName,
  description: "read school by school name",
}

export default endpoints;