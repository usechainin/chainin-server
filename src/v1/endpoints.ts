import { Express, Request, Response } from "express";
import middleware from "./middleware";
import userHandler from "./handlers/userHandler";
import handleRootRequest from "./handlers/rootHandler";
import organisationHandler from "./handlers/organisationHandler";
import listingHandler from "./handlers/listingHandler";
import applicationHandler from "./handlers/applicationHandler";

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

endpoints.readOrganisationByOrganisationId = {
  url: "/v1/organisation/id/:organisation_id",
  method: "get",
  middleware: [],
  handler: organisationHandler.readByOrganisationId,
  description: "read organisation by organisation id",
};

endpoints.readOrganisationByOrganisationName = {
  url: "/v1/organisation/name/:organisation_name",
  method: "get",
  middleware: [],
  handler: organisationHandler.readByOrganisationName,
  description: "read organisation by organisation name",
};

endpoints.readOrganisationByOrganisationSymbol = {
  url: "/v1/organisation/symbol/:organisation_symbol",
  method: "get",
  middleware: [],
  handler: organisationHandler.readByOrganisationSymbol,
  description: "read organisation by organisation symbol",
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
//////////////// LISTING ////////////////
/////////////////////////////////////////

endpoints.createListing = {
  url: "/v1/listing",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: listingHandler.create,
  description: "create listing",
};

endpoints.readListing = {
  url: "/v1/listing",
  method: "get",
  middleware: [],
  handler: listingHandler.read,
  description: "read all listings",
};

endpoints.readListingByListingId = {
  url: "/v1/listing/id/:listing_id",
  method: "get",
  middleware: [],
  handler: listingHandler.readByListingId,
  description: "read listing by listing id",
};

endpoints.readListingByListingTitle = {
  url: "/v1/listing/title/:listing_title",
  method: "get",
  middleware: [],
  handler: listingHandler.readByListingTitle,
  description: "read listing by listing title",
};

endpoints.readListingByOrganisationId = {
  url: "/v1/listing/organisation/:organisation_id",
  method: "get",
  middleware: [],
  handler: listingHandler.readByOrganisationId,
  description: "read listing by organisation id",
};

endpoints.updateListingByListingId = {
  url: "/v1/listing/:listing_id",
  method: "put",
  middleware: [],
  handler: listingHandler.updateByListingId,
  description: "update listing by listing id",
};

endpoints.deleteListingByListingId = {
  url: "/v1/listing/:listing_id",
  method: "delete",
  middleware: [],
  handler: listingHandler.deleteByListingId,
  description: "delete listing by listing id",
};

/////////////////////////////////////////
////////////// APPLICATION //////////////
/////////////////////////////////////////

endpoints.createApplication = {
  url: "/v1/application",
  method: "post",
  middleware: [middleware.checkWhitelistedIpAddress],
  handler: applicationHandler.create,
  description: "create application",
};

endpoints.readApplication = {
  url: "/v1/application",
  method: "get",
  middleware: [],
  handler: applicationHandler.read,
  description: "read all applications",
};

endpoints.readApplicationBySubgraphId = {
  url: "/v1/application/subgraph/:subgraph_id",
  method: "get",
  middleware: [],
  handler: applicationHandler.readBySubgraphId,
  description: "read application by subgraph id",
};

endpoints.readApplicationByWalletAddress = {
  url: "/v1/application/user/:applicant_wallet_address",
  method: "get",
  middleware: [],
  handler: applicationHandler.readByWalletAddress,
  description: "read application by applicant wallet address",
};

endpoints.readApplicationByListingId = {
  url: "/v1/application/listing/:listing_id",
  method: "get",
  middleware: [],
  handler: applicationHandler.readByListingId,
  description: "read application by listing id",
};

endpoints.readApplicationByOrganisationId = {
  url: "/v1/application/organisation/:organisation_id",
  method: "get",
  middleware: [],
  handler: applicationHandler.readByOrganisationId,
  description: "read application by organisation id",
};

endpoints.updateUserBySubgraphId = {
  url: "/v1/application/:subgraph_id",
  method: "put",
  middleware: [],
  handler: applicationHandler.updateBySubgraphId,
  description: "update application by subgraph id",
};

endpoints.deleteUserBySubgraphId = {
  url: "/v1/application/:subgraph_id",
  method: "delete",
  middleware: [],
  handler: applicationHandler.deleteBySubgraphId,
  description: "delete application by subgraph id",
};

export default endpoints;
