import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import User from "../classes/user";

import dotenv from "dotenv";
dotenv.config();

const userHandler = {
  create: async (req: Request, res: Response) => {
    const user = new User();
    user.set(req.body);
    try {
      const result = await user.create();
      res.status(200).send(result);
    } catch (err) {
      console.log(err, "Error: userHandler: create");
      res.status(400).send(new ApiError(400, err));
    }
  },

  read: async (req: Request, res: Response) => {
    const user = new User();
    try {
      const users = await user.read();
      res.status(200).send(users);
    } catch (err) {
      console.log(err, "Error: read");
      res.status(400).send(new ApiError(400, err));
    }
  },

  readByWalletAddress: async (req: Request, res: Response) => {
    const walletAddress = String(req.params.wallet_address);
    if (walletAddress) {
      const user = new User();
      try {
        const userObj = await user.readByWalletAddress(walletAddress);
        res.status(200).send(userObj);
      } catch (err) {
        console.log(err, "Reading wallet address error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No wallet address provided"));
    }
  },

  updateByWalletAddress: async (req: Request, res: Response) => {
    const walletAddress = String(req.params.wallet_address);
    if (walletAddress) {
      const user = new User();
      user.set(req.body);
      try {
        const userObj = await user.updateByWalletAddress(walletAddress, user);
        res.status(200).send(userObj);
      } catch (err) {
        console.log(err, "Updating user details error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No wallet address provided"));
    }
  },

  deleteByWalletAddress: async (req: Request, res: Response) => {
    const walletAddress = String(req.params.wallet_address);
    if (walletAddress) {
      const user = new User();
      try {
        const userObj = await user.deleteByWalletAddress(walletAddress);
        res.status(200).send(userObj);
      } catch (err) {
        console.log(err, "Deleting wallet address error");
        res.status(400).send(new ApiError(400, err));
      }
    } else {
      res.status(404).send(new ApiError(404, "No wallet address provided"));
    }
  },
};

export default userHandler;
