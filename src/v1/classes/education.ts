import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const educationTable = process.env.TABLELAND_EDUCATION_DATABASE;

class Education {
    success?: boolean;
    school_id?: number;
    wallet_address?: string;
    school_name?: string;
    degree?: string;
    field_of_study?: string;
    start_date?: number;
    end_date?: number;
    description?: string;

    constructor(education?: {
        success?: boolean;
        school_id?: number;
        wallet_address?: string;
        school_name?: string;
        degree?: string;
        field_of_study?: string;
        start_date?: number;
        end_date?: number;
        description?: string;
    }) {
        this.set(education);
    }
        set(education?: {
        success?: boolean;
        school_id?: number;
        wallet_address?: string;
        school_name?: string;
        degree?: string;
        field_of_study?: string;
        start_date?: number;
        end_date?: number;
        description?: string;
    }) {
    if (education !== undefined) {
        this.success = education.success;
        this.school_id = education.school_id;
        this.wallet_address = education.wallet_address;
        this.school_name = education.school_name;
        this.degree = education.degree;
        this.field_of_study = education.field_of_study;
        this.start_date = education.start_date;
        this.end_date = education.end_date;
        this.description = education.description;
    }
}

    /////////////////////////////////////////
    //////////// CRUD OPERATIONS ////////////
    /////////////////////////////////////////

    // create an education
    create = async (): Promise<Object | Array<number>> => {
        const education = this;
        return new Promise<Object | Array<number>>(async (resolve, reject) => {
        try {
            const { error, meta: insert } = await db
            .prepare(
                `INSERT INTO ${educationTable} (wallet_address, school_name, degree, field_of_study, start_date, end_date, description) VALUES (?, ?, ?, ?, ?, ?, ?);`
            )
            .bind(
                education.wallet_address,
                education.school_name,
                education.degree,
                education.field_of_study,
                education.start_date,
                education.end_date,
                education.description
            )
            .run();

            const status = await insert.txn?.wait();
            console.log(status);

            const { results } = await db
            .prepare(`SELECT * FROM ${educationTable} ORDER BY school_id DESC LIMIT 1;`)
            .all();

            resolve(results[0] || "undefined");
        } catch (e: any) {
            console.log(e);
            reject({
            success: false,
            message: e.message,
            cause: e.cause ? e.cause.message : "Unknown error",
            });
        }});
    };
  
    // get education by wallet_address
    readByWalletAddress = async (wallet_address: string): Promise<Education | Object> => {
        console.log(wallet_address, "wats wallet address?");
        return new Promise<Education | Object>(async (resolve, reject) => {
        try {
            const results: any = await db
            .prepare(`SELECT * FROM ${educationTable} WHERE wallet_address = ?1`)
            .bind(wallet_address)
            .all();

            resolve(results);
        } catch (e: any) {
            console.log(e);
            reject({
            success: false,
            message: e.message,
            cause: e.cause ? e.cause.message : "Unknown error",
            });
        }});
    };
}

export default Education;
