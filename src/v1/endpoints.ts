import { Express, Request, Response } from "express";
import middleware from "./middleware";
import userHandler from "./handlers/userHandler";
import educationHandler from "./handlers/educationHandler";
import handleRootRequest from "./handlers/rootHandler";
import schoolHandler from "./handlers/schoolHandler";
import companyHandler from "./handlers/companyHandler";
import organisationHandler from "./handlers/organisationHandler";

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
};

endpoints.updateUserByWalletAddress = {
  url: "/v1/user/:wallet_address",
  method: "put",
  middleware: [],
  handler: userHandler.updateByWalletAddress,
  description: "update user by wallet address",
};

endpoints.deleteUserByWalletAddress = {
  url: "/v1/user/:wallet_address",
  method: "delete",
  middleware: [],
  handler: userHandler.deleteByWalletAddress,
  description: "delete user by wallet address",
};

/////////////////////////////////////////
////////////// ORGANISATION /////////////
/////////////////////////////////////////

endpoints.createOrganisation = {
  url: "/v1/organisation",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: organisationHandler.create,
  description: "create organisation",
};

endpoints.readOrganisation = {
  url: "/v1/organisation",
  method: "get",
  middleware: [],
  handler: organisationHandler.read,
  description: "read all organisations",
};

endpoints.readOrganisationByOrganisationName = {
  url: "/v1/organisation/:organisation_name",
  method: "get",
  middleware: [],
  handler: organisationHandler.readByOrganisationName,
  description: "read organisation by organisation name",
};

endpoints.updateOrganisationByOrganisationId = {
  url: "/v1/organisation/:organisation_id",
  method: "put",
  middleware: [],
  handler: organisationHandler.updateByOrganisationId,
  description: "update organisation by organisation id",
};

endpoints.deleteOrganisationByOrganisationId = {
  url: "/v1/organisation/:organisation_id",
  method: "delete",
  middleware: [],
  handler: organisationHandler.deleteByOrganisationId,
  description: "delete organisation by organisation id",
};

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
};

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
};

/////////////////////////////////////////
/////////////// COMPANY /////////////////
/////////////////////////////////////////

endpoints.createCompany = {
  url: "/v1/company",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: companyHandler.create,
  description: "create company",
};

endpoints.readCompany = {
  url: "/v1/company",
  method: "get",
  middleware: [],
  handler: companyHandler.read,
  description: "read all companies",
};

endpoints.readCompanyByCompanyName = {
  url: "/v1/company/:company_name",
  method: "get",
  middleware: [],
  handler: companyHandler.readByCompanyName,
  description: "read company by company name",
};
export default endpoints;
