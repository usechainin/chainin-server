import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import Application from "../classes/application";

import dotenv from "dotenv";
dotenv.config();

const applicationHandler = {
  create: async (req: Request, res: Response) => {
    const application = new Application();
    application.set(req.body);
    try {
      const result = await application.create();
      res.status(200).send(result);
    } catch (err) {
      console.log(err, "Error: applicationHandler: create");
      res.status(400).send(new ApiError(400, err));
    }
  },

  read: async (req: Request, res: Response) => {
    const application = new Application();
    try {
      const applications = await application.read();
      res.status(200).send(applications);
    } catch (err) {
      console.log(err, "Error: read");
      res.status(400).send(new ApiError(400, err));
    }
  },

  readBySubgraphId: async (req: Request, res: Response) => {
    const subgraphId = String(req.params.subgraph_id);
    if (subgraphId) {
      const application = new Application();
      try {
        const applicationObj = await application.readBySubgraphId(subgraphId);
        res.status(200).send(applicationObj);
      } catch (err) {
        console.log(err, "Reading subgraph id error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No subgraph id provided"));
    }
  },

  readByWalletAddress: async (req: Request, res: Response) => {
    const applicantWalletAddress = String(req.params.applicant_wallet_address);
    if (applicantWalletAddress) {
      const application = new Application();
      try {
        const applicationObj = await application.readByWalletAddress(
          applicantWalletAddress
        );
        res.status(200).send(applicationObj);
      } catch (err) {
        console.log(err, "Reading applicant wallet address error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res
        .status(404)
        .send(new ApiError(404, "No applicant wallet address provided"));
    }
  },

  readByListingId: async (req: Request, res: Response) => {
    const listingId = Number(req.params.listing_id);
    if (listingId) {
      const application = new Application();
      try {
        const applicationObj = await application.readByListingId(listingId);
        res.status(200).send(applicationObj);
      } catch (err) {
        console.log(err, "Reading listing id error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No listing id provided"));
    }
  },

  readByOrganisationId: async (req: Request, res: Response) => {
    const organisationId = Number(req.params.organisation_id);
    if (organisationId) {
      const application = new Application();
      try {
        const applicationObj = await application.readByOrganisationId(
          organisationId
        );
        res.status(200).send(applicationObj);
      } catch (err) {
        console.log(err, "Reading organisation id error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No organisation id provided"));
    }
  },

  updateBySubgraphId: async (req: Request, res: Response) => {
    const subgraphId = String(req.params.subgraph_id);
    if (subgraphId) {
      const application = new Application();
      application.set(req.body);
      try {
        const applicationObj = await application.updateBySubgraphId(
          subgraphId,
          application
        );
        res.status(200).send(applicationObj);
      } catch (err) {
        console.log(err, "Updating application details error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No subgraph id provided"));
    }
  },

  deleteBySubgraphId: async (req: Request, res: Response) => {
    const subgraphId = String(req.params.subgraph_id);
    if (subgraphId) {
      const application = new Application();
      try {
        const applicationObj = await application.deleteBySubgraphId(subgraphId);
        res.status(200).send(applicationObj);
      } catch (err) {
        console.log(err, "Deleting subgraph id error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No subgraph id provided"));
    }
  },
};

export default applicationHandler;
