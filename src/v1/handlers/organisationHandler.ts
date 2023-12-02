import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import Organisation from "../classes/organisation";

import dotenv from "dotenv";
dotenv.config();

const organisationHandler = {
  create: async (req: Request, res: Response) => {
    const organisation = new Organisation();
    organisation.set(req.body);
    try {
      const result = await organisation.create();
      res.status(200).send(result);
    } catch (err) {
      console.log(err, "Error: organisationHandler: create");
      res.status(400).send(new ApiError(400, err));
    }
  },

  read: async (req: Request, res: Response) => {
    const organisation = new Organisation();
    try {
      const organisations = await organisation.read();
      res.status(200).send(organisations);
    } catch (err) {
      console.log(err, "Error: read");
      res.status(400).send(new ApiError(400, err));
    }
  },

  readByOrganisationName: async (req: Request, res: Response) => {
    const organisationName = String(req.params.organisation_name);
    if (organisationName) {
      const organisation = new Organisation();
      try {
        const organisationObj = await organisation.readByOrganisationName(
          organisationName
        );
        res.status(200).send(organisationObj);
      } catch (err) {
        console.log(err, "Reading organisation name error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No organisation name provided"));
    }
  },

  readByOrganisationSymbol: async (req: Request, res: Response) => {
    const organisationSymbol = String(req.params.organisation_symbol);
    if (organisationSymbol) {
      const organisation = new Organisation();
      try {
        const organisationObj = await organisation.readByOrganisationSymbol(
          organisationSymbol
        );
        res.status(200).send(organisationObj);
      } catch (err) {
        console.log(err, "Reading organisation symbol error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No organisation symbol provided"));
    }
  },

  updateByOrganisationId: async (req: Request, res: Response) => {
    const organisationId = Number(req.params.organisation_id);
    if (organisationId) {
      const organisation = new Organisation();
      organisation.set(req.body);
      try {
        const organisationObj = await organisation.updateByOrganisationId(
          organisationId,
          organisation
        );
        res.status(200).send(organisationObj);
      } catch (err) {
        console.log(err, "Updating organisation details error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No organisation id provided"));
    }
  },

  deleteByOrganisationId: async (req: Request, res: Response) => {
    const organisationId = Number(req.params.organisation_id);
    if (organisationId) {
      const organisation = new Organisation();
      try {
        const organisationObj = await organisation.deleteByOrganisationId(
          organisationId
        );
        res.status(200).send(organisationObj);
      } catch (err) {
        console.log(err, "Deleting organisation details error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No organisation id provided"));
    }
  },
};

export default organisationHandler;
