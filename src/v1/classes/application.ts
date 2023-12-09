import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const applicationTable = process.env.TABLELAND_APPLICATION_DATABASE;
const listingTable = process.env.TABLELAND_LISTING_DATABASE;

class Application {
  success?: boolean;
  subgraph_id?: string;
  applicant_wallet_address?: string;
  listing_id?: number;
  profile_url?: string;

  constructor(application?: {
    success?: boolean;
    subgraph_id?: string;
    applicant_wallet_address?: string;
    listing_id?: number;
    profile_url?: string;
  }) {
    this.set(application);
  }
  set(application?: {
    success?: boolean;
    subgraph_id?: string;
    applicant_wallet_address?: string;
    listing_id?: number;
    profile_url?: string;
  }) {
    if (application !== undefined) {
      this.success = application.success;
      this.subgraph_id = application.subgraph_id;
      this.applicant_wallet_address = application.applicant_wallet_address;
      this.listing_id = application.listing_id;
      this.profile_url = application.profile_url;
    }
  }

  /////////////////////////////////////////
  //////////// CRUD OPERATIONS ////////////
  /////////////////////////////////////////

  // create a new application
  create = async (): Promise<Application | undefined> => {
    const application = this;
    return new Promise<Application | undefined>(async (resolve, reject) => {
      try {
        const { results } = await db
          .prepare(`SELECT * FROM ${applicationTable} WHERE subgraph_id = ?1`)
          .bind(application.subgraph_id)
          .all();

        if (results.length > 0) {
          reject("Subgraph Query already exists");
        } else {
          // Insert a row into the table
          const { error, meta: insert } = await db
            .prepare(
              `INSERT INTO ${applicationTable} (subgraph_id, applicant_wallet_address, listing_id, profile_url) VALUES (?, ?, ?, ?);`
            )
            .bind(
              application.subgraph_id,
              application.applicant_wallet_address,
              application.listing_id,
              application.profile_url
            )
            .run();

          // Wait for transaction finality
          const status = await insert.txn?.wait();
          console.log(status, "status of waiting for tx");

          const newApplication = new Application({
            success: true,
            subgraph_id: application.subgraph_id,
            applicant_wallet_address: application.applicant_wallet_address,
            listing_id: application.listing_id,
            profile_url: application.profile_url,
          });

          resolve(newApplication);
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

  // get all applications
  read = async (): Promise<Application | undefined> => {
    return new Promise<Application | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(
            `SELECT a.*, l.organisation_id AS organisation_id, l.listing_title AS listing_title
            FROM ${applicationTable} a
            LEFT JOIN ${listingTable} l
            ON a.listing_id = l.listing_id`
          )
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

  // get application by subgraph_id
  readBySubgraphId = async (
    subgraph_id: string
  ): Promise<Application | undefined> => {
    console.log(subgraph_id, "wats subgraph id?");
    return new Promise<Application | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(
            `SELECT a.*, l.organisation_id AS organisation_id, l.listing_title AS listing_title
            FROM ${applicationTable} a
            LEFT JOIN ${listingTable} l
            ON a.listing_id = l.listing_id
            WHERE a.subgraph_id = ?1`
          )
          .bind(subgraph_id)
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

  // get application by applicant_wallet_address
  readByWalletAddress = async (
    applicant_wallet_address: string
  ): Promise<Application | undefined> => {
    console.log(applicant_wallet_address, "wats wallet address?");
    return new Promise<Application | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(
            `SELECT a.*, l.organisation_id AS organisation_id, l.listing_title AS listing_title
          FROM ${applicationTable} a
          LEFT JOIN ${listingTable} l
          ON a.listing_id = l.listing_id
          WHERE a.applicant_wallet_address = ?1`
          )
          .bind(applicant_wallet_address)
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

  // get application by listing_id
  readByListingId = async (
    listing_id: string
  ): Promise<Application | undefined> => {
    console.log(listing_id, "wats listing id?");
    return new Promise<Application | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(
            `SELECT a.*, l.organisation_id AS organisation_id, l.listing_title AS listing_title
              FROM ${applicationTable} a
              LEFT JOIN ${listingTable} l
              ON a.listing_id = l.listing_id
              WHERE a.listing_id = ?1`
          )
          .bind(listing_id)
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

  // get application by listing_id
  readByOrganisationId = async (
    organisation_id: string
  ): Promise<Application | undefined> => {
    console.log(organisation_id, "wats organisation id?");
    return new Promise<Application | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(
            `SELECT a.*, l.organisation_id AS organisation_id, l.listing_title AS listing_title
                FROM ${applicationTable} a
                LEFT JOIN ${listingTable} l
                ON a.listing_id = l.listing_id
                WHERE l.organisation_id = ?1`
          )
          .bind(organisation_id)
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

  // update application by subgraph_id
  updateBySubgraphId = async (
    subgraph_id: string,
    application: Application
  ): Promise<Application | undefined> => {
    return new Promise<Application | undefined>(async (resolve, reject) => {
      try {
        const { error, meta: update } = await db
          .prepare(
            `UPDATE ${applicationTable} SET applicant_wallet_address = ?, listing_id = ?, profile_url = ? WHERE subgraph_id = ?;`
          )
          .bind(
            application.applicant_wallet_address,
            application.listing_id,
            application.profile_url,
            subgraph_id
          )
          .run();

        // Wait for transaction finality
        const status = await update.txn?.wait();
        console.log(status, "status of waiting for tx");

        const updatedApplication = new Application({
          success: true,
          subgraph_id: subgraph_id,
          applicant_wallet_address: application.applicant_wallet_address,
          listing_id: application.listing_id,
          profile_url: application.profile_url,
        });

        resolve(updatedApplication);
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

  // delete application by subgraph_id
  deleteBySubgraphId = async (
    subgraph_id: string
  ): Promise<Application | undefined> => {
    return new Promise<Application | undefined>(async (resolve, reject) => {
      try {
        const { error, meta: del } = await db
          .prepare(`DELETE FROM ${applicationTable} WHERE subgraph_id = ?;`)
          .bind(subgraph_id)
          .run();

        // Wait for transaction finality
        const status = await del.txn?.wait();
        console.log(status, "status of waiting for tx");

        const deletedApplicant = new Application({
          success: true,
          subgraph_id: subgraph_id,
        });

        resolve(deletedApplicant);
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

export default Application;
