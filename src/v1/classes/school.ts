import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const schoolTable = process.env.TABLELAND_SCHOOL_DATABASE;

class School {
    success?: boolean;
    school_name?: string;
    description?: string;
    picture_url?: string;
    headquarter?: string;
    website_url?: string;
    creator_wallet_address?: string;

    constructor(school?: School) {
        if (school) {
            this.set(school);
        }
    }

    set(school: School) {
        if (school) {
            this.success = school.success;
            this.school_name = school.school_name;
            this.description = school.description;
            this.picture_url = school.picture_url;
            this.headquarter = school.headquarter;
            this.website_url = school.website_url;
            this.creator_wallet_address = school.creator_wallet_address;
        }
    }

    /////////////////////////////////////////
    //////////// CRUD OPERATIONS ////////////
    /////////////////////////////////////////

    // create a new school
    create = async (): Promise<School | undefined> => {
        const school = this;
        return new Promise<School | undefined>(async (resolve, reject) => {
        try {
            const { results } = await db
            .prepare(`SELECT * FROM ${schoolTable} WHERE school_name = ?1`)
            .bind(school.school_name)
            .all();

            if (results.length > 0) {
            reject("School already exists");
            } else {
            // Insert a row into the table
            const { error, meta: insert } = await db
                .prepare(
                `INSERT INTO ${schoolTable} (school_name, description, picture_url, headquarter, website_url, creator_wallet_address) VALUES (?, ?, ?, ?, ?, ?);`
                )
                .bind(school.school_name, school.description, school.picture_url, school.headquarter, school.website_url, school.creator_wallet_address)
                .run();

            // Wait for transaction finality
            const status = await insert.txn?.wait();
            console.log(status, "status of waiting for tx");

            const newSchool = new School({
                success: true,
                ...school,
            });

            resolve(newSchool);
            }
        } catch (e: any) {
            console.log(e);
            reject({
            success: false,
            message: e.message,
            cause: e.cause ? e.cause.message : "Unknown error",
            });
        }
        });
    };
    
    // get all schools
    read = async (): Promise<School | undefined> => {
        return new Promise<School | undefined>(async (resolve, reject) => {
        try {
            const results: any = await db
            .prepare(`SELECT * FROM ${schoolTable}`)
            .bind()
            .all();

            if (results.results.length === 0) {
            resolve(undefined);
            } else {
            resolve(results.results);
            }
        } catch (e: any) {
            console.log(e);
            reject({
            success: false,
            message: e.message,
            cause: e.cause ? e.cause.message : "Unknown error",
            });
        }
        });
    };

    // get school by school_name
    readBySchoolName = async (school_name: string): Promise<School | undefined> => {
        console.log(school_name, "wats school name?");
        return new Promise<School | undefined>(async (resolve, reject) => {
        try {
            const results: any = await db
            .prepare(`SELECT * FROM ${schoolTable} WHERE school_name = ?1`)
            .bind(school_name)
            .all();

            if (results.results.length === 0) {
            resolve(undefined);
            } else {
            console.log(results, "wats results?");
            resolve(results.results[0]);
            }
        } catch (e: any) {
            console.log(e);
            reject({
            success: false,
            message: e.message,
            cause: e.cause ? e.cause.message : "Unknown error",
            });
        }
        });
    };
}

export default School;
