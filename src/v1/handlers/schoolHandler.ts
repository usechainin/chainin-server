import { Request, Response } from "express";
import ApiError from "../classes/ApiError";
import School from "../classes/school";

import dotenv from "dotenv";
dotenv.config();

const schoolHandler = {
    create: async (req: Request, res: Response) => {
        const school = new School();
        school.set(req.body);
        try {
            const result = await school.create();
            res.status(200).send(result);
        } catch (err) {
            console.log(err, "Error: schoolHandler: create");
            res.status(400).send(new ApiError(400, err));
        }
    },

    read: async (req: Request, res: Response) => {
        const user = new School();
        try {
            const users = await user.read();
            res.status(200).send(users);
        } catch (err) {
            console.log(err, "Error: read");
            res.status(400).send(new ApiError(400, err));
        }
    },

    readBySchoolName: async (req: Request, res: Response) => {
        const schoolName = String(req.params.school_name);
        if (schoolName) {
        const school = new School();
        try {
            const schoolObj = await school.readBySchoolName(schoolName);
            res.status(200).send(schoolObj);
        } catch (err) {
            console.log(err, "Reading school name error");
            res.status(400).send(new ApiError(400, err));
        }
        } else {
            res.status(404).send(new ApiError(404, "No school name provided"));
        }
    },
};

export default schoolHandler;
