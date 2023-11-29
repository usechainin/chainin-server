import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import Company from "../classes/company";

import dotenv from "dotenv";
dotenv.config();

const companyHandler = {
    create: async (req: Request, res: Response) => {
        const company = new Company();
        company.set(req.body);
        try {
            const result = await company.create();
            res.status(200).send(result);
        } catch (err) {
            console.log(err, "Error: companyHandler: create");
            res.status(400).send(new ApiError(400, err));
        }
    },

    read: async (req: Request, res: Response) => {
        const company = new Company();
        try {
            const companies = await company.read();
            res.status(200).send(companies);
        } catch (err) {
            console.log(err, "Error: read");
            res.status(400).send(new ApiError(400, err));
        }
    },

    readByCompanyName: async (req: Request, res: Response) => {
        const companyName = String(req.params.company_name);
        if (companyName) {
        const company = new Company();
        try {
            const companyObj = await company.readByCompanyName(companyName);
            res.status(200).send(companyObj);
        } catch (err) {
            console.log(err, "Reading company name error");
            res.status(400).send(new ApiError(400, err));
        }
        } else {
            res.status(404).send(new ApiError(404, "No company name provided"));
        }
    },
};

export default companyHandler;
