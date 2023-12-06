import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import Listing from "../classes/listing";

import dotenv from "dotenv";
dotenv.config();

const listingHandler = {
  create: async (req: Request, res: Response) => {
    const listing = new Listing();
    listing.set(req.body);
    try {
      const result = await listing.create();
      res.status(200).send(result);
    } catch (err) {
      console.log(err, "Error: listingHandler: create");
      res.status(400).send(new ApiError(400, err));
    }
  },

  read: async (req: Request, res: Response) => {
    const listing = new Listing();
    try {
      const listings = await listing.read();
      res.status(200).send(listings);
    } catch (err) {
      console.log(err, "Error: listingHandler: read");
      res.status(400).send(new ApiError(400, err));
    }
  },

  readByListingId: async (req: Request, res: Response) => {
    const listingId = String(req.params.listing_id);
    if (listingId) {
      const listing = new Listing();
      try {
        const listingObj = await listing.readByListingId(listingId);
        res.status(200).send(listingObj);
      } catch (err) {
        console.log(err, "Reading listing id error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No listing id provided"));
    }
  },

  readByListingTitle: async (req: Request, res: Response) => {
    const listingTitle = String(req.params.listing_title);
    if (listingTitle) {
      const listing = new Listing();
      try {
        const listingObj = await listing.readByListingTitle(listingTitle);
        res.status(200).send(listingObj);
      } catch (err) {
        console.log(err, "Reading listing title error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No listing title provided"));
    }
  },

  readByOrganisationId: async (req: Request, res: Response) => {
    const organisationId = Number(req.params.organisation_id);
    if (organisationId) {
      const listing = new Listing();
      try {
        const listingObj = await listing.readByOrganisationId(organisationId);
        res.status(200).send(listingObj);
      } catch (err) {
        console.log(err, "Reading organisation id error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No organisation id provided"));
    }
  },

  updateByListingId: async (req: Request, res: Response) => {
    const listingId = Number(req.params.listing_id);
    if (listingId) {
      const listing = new Listing();
      listing.set(req.body);
      try {
        const listingObj = await listing.updateByListingId(listingId, listing);
        res.status(200).send(listingObj);
      } catch (err) {
        console.log(err, "Updating listing details error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No listing id provided"));
    }
  },

  deleteByListingId: async (req: Request, res: Response) => {
    const listingId = Number(req.params.listing_id);
    if (listingId) {
      const listing = new Listing();
      try {
        const listingObj = await listing.deleteByListingId(listingId);
        res.status(200).send(listingObj);
      } catch (err) {
        console.log(err, "Deleting listing details error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No listing id provided"));
    }
  },
};

export default listingHandler;
