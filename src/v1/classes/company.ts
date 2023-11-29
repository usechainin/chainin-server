import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const companyTable = process.env.TABLELAND_COMPANY_DATABASE;

class Company {
    success?: boolean;
    company_name?: string;
    industry?: string;
    description?: string;
    headquarter?: string;
    website_url?: string;
    picture_url?: string;
    creator_wallet_address?: string;

    constructor(company?: Company) {
        if (company) {
            this.set(company);
        }
    }

    set(company: Company) {
        if (company) {
            this.success = company.success;
            this.company_name = company.company_name;
            this.industry = company.industry;
            this.description = company.description;
            this.headquarter = company.headquarter;
            this.website_url = company.website_url;
            this.picture_url = company.picture_url;
            this.creator_wallet_address = company.creator_wallet_address;
        }
    }

    /////////////////////////////////////////
    //////////// CRUD OPERATIONS ////////////
    /////////////////////////////////////////

    // create a new company
    create = async (): Promise<Company | undefined> => {
        const company = this;
        return new Promise<Company | undefined>(async (resolve, reject) => {
        try {
            const { results } = await db
            .prepare(`SELECT * FROM ${companyTable} WHERE company_name = ?1`)
            .bind(company.company_name)
            .all();

            if (results.length > 0) {
            reject("Company already exists");
            } else {
            // Insert a row into the table
            const { error, meta: insert } = await db
                .prepare(
                `INSERT INTO ${companyTable} (company_name, industry, description, headquarter, website_url, picture_url, creator_wallet_address) VALUES (?, ?, ?, ?, ?, ?, ?);`
                )
                .bind(company.company_name, company.industry, company.description, company.headquarter, company.website_url, company.picture_url, company.creator_wallet_address)
                .run();

            // Wait for transaction finality
            const status = await insert.txn?.wait();
            console.log(status, "status of waiting for tx");

            const newCompany = new Company({
                success: true,
                ...company,
            });

            resolve(newCompany);
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
    
    // get all company
    read = async (): Promise<Company | undefined> => {
        return new Promise<Company | undefined>(async (resolve, reject) => {
        try {
            const results: any = await db
            .prepare(`SELECT * FROM ${companyTable}`)
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

    // get company by company_name
    readByCompanyName = async (company_name: string): Promise<Company | undefined> => {
        console.log(company_name, "wats company name?");
        return new Promise<Company | undefined>(async (resolve, reject) => {
        try {
            const results: any = await db
            .prepare(`SELECT * FROM ${companyTable} WHERE company_name = ?1`)
            .bind(company_name)
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

export default Company;
