import { Request, Response } from "express";

const handleRootRequest = (req: Request, res: Response) => {
  res.status(200).send({ status: true });
};

export default handleRootRequest;
