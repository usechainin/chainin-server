import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import Education from "../classes/education";

import dotenv from "dotenv";
dotenv.config();

const educationHandler = {
    create: async (req: Request, res: Response) => {
        const education = new Education();
        education.set(req.body);
        try {
            const result = await education.create();
            res.status(200).send(result);
        } catch (err) {
            console.log(err, "Error: educationHandler: create");
            res.status(400).send(new ApiError(400, err));
        }
    },

    readByWalletAddress: async (req: Request, res: Response) => {
        const walletAddress = String(req.params.wallet_address);
        if (walletAddress) {
        const education = new Education();
        try {
            const educationObj = await education.readByWalletAddress(walletAddress);
            res.status(200).send(educationObj);
        } catch (err) {
            console.log(err, "Reading wallet address error");
            res.status(400).send(new ApiError(400, err));
        }
        } else {
            res.status(404).send(new ApiError(404, "No wallet address provided"));
        }
    },
};

export default educationHandler;
