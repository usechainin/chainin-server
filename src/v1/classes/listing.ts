import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const listingTable = process.env.TABLELAND_LISTING_DATABASE;
const organisationTable = process.env.TABLELAND_ORGANISATION_DATABASE;

class Listing {
  success?: boolean;
  listing_id?: number;
  organisation_id?: number;
  listing_title?: string;
  employment_status?: string;
  location?: string;
  description?: string;

  constructor(listing?: Listing) {
    if (listing) {
      this.set(listing);
    }
  }

  set(listing: Listing) {
    if (listing) {
      this.success = listing.success;
      this.listing_id = listing.listing_id;
      this.organisation_id = listing.organisation_id;
      this.listing_title = listing.listing_title;
      this.employment_status = listing.employment_status;
      this.location = listing.location;
      this.description = listing.description;
    }
  }

  /////////////////////////////////////////
  //////////// CRUD OPERATIONS ////////////
  /////////////////////////////////////////

  // create a job listing
  create = async (): Promise<Object | Array<number>> => {
    const listing = this;
    return new Promise<Object | Array<number>>(async (resolve, reject) => {
      try {
        const { error, meta: insert } = await db
          .prepare(
            `INSERT INTO ${listingTable} (organisation_id, listing_title, employment_status, location, description) VALUES (?, ?, ?, ?, ?);`
          )
          .bind(
            listing.organisation_id,
            listing.listing_title,
            listing.employment_status,
            listing.location,
            listing.description
          )
          .run();

        const status = await insert.txn?.wait();
        console.log(status);

        const { results } = await db
          .prepare(
            `SELECT * FROM ${listingTable} ORDER BY listing_id DESC LIMIT 1;`
          )
          .all();

        resolve(results[0] || "undefined");
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

  // get all listings
  read = async (): Promise<Listing | undefined> => {
    return new Promise<Listing | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(
            `SELECT l.*, o.organisation_name AS organisation_name, o.picture_url AS organisation_logo, o.creator_wallet_address AS organisation_creator
            FROM ${listingTable} l
            LEFT JOIN ${organisationTable} o 
            ON l.organisation_id = o.organisation_id`
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

  // get listing by listing_id
  readByListingId = async (listing_id: string): Promise<Listing | Object> => {
    console.log(listing_id, "wats listing id?");
    return new Promise<Listing | Object>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(
            `SELECT l.*, o.organisation_name AS organisation_name, o.picture_url AS organisation_logo, o.creator_wallet_address AS organisation_creator
            FROM ${listingTable} l
            LEFT JOIN ${organisationTable} o 
            ON l.organisation_id = o.organisation_id
            WHERE listing_id = ?1`
          )
          .bind(listing_id)
          .all();

        resolve(results);
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

  // get listing by listing_title
  readByListingTitle = async (
    listing_title: string
  ): Promise<Listing | Object> => {
    console.log(listing_title, "wats listing title?");
    return new Promise<Listing | Object>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(
            `SELECT l.*, o.organisation_name AS organisation_name, o.picture_url AS organisation_logo, o.creator_wallet_address AS organisation_creator
            FROM ${listingTable} l
            LEFT JOIN ${organisationTable} o 
            ON l.organisation_id = o.organisation_id
            WHERE listing_title = ?1`
          )
          .bind(listing_title)
          .all();

        resolve(results);
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

  // get listing by organisation_name
  readByOrganisationId = async (
    organisation_id: number
  ): Promise<Listing | Object> => {
    console.log(organisation_id, "wats organisation id?");
    return new Promise<Listing | Object>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(
            `SELECT l.*, o.organisation_name AS organisation_name, o.picture_url AS organisation_logo, o.creator_wallet_address AS organisation_creator
            FROM ${listingTable} l
            LEFT JOIN ${organisationTable} o 
            ON l.organisation_id = o.organisation_id
            WHERE l.organisation_id = ?1`
          )
          .bind(organisation_id)
          .all();

        resolve(results);
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

  // update listing by listing_id
  updateByListingId = async (
    listing_id: number,
    listing: Listing
  ): Promise<Object> => {
    return new Promise<Object>(async (resolve, reject) => {
      try {
        const { error, meta: update } = await db
          .prepare(
            `UPDATE ${listingTable} SET organisation_id = ?, listing_title = ?, employment_status = ?, location = ?, description = ? WHERE listing_id = ?;`
          )
          .bind(
            listing.organisation_id,
            listing.listing_title,
            listing.employment_status,
            listing.location,
            listing.description,
            listing_id
          )
          .run();

        const status = await update.txn?.wait();
        console.log(status);

        const { results } = await db
          .prepare(`SELECT * FROM ${listingTable} WHERE listing_id = ?;`)
          .bind(listing_id)
          .all();

        resolve(results[0] || "undefined");
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

  // delete listing by listing_id
  deleteByListingId = async (listing_id: number): Promise<Object> => {
    return new Promise<Object>(async (resolve, reject) => {
      try {
        const { error, meta: update } = await db
          .prepare(`DELETE FROM ${listingTable} WHERE listing_id = ?;`)
          .bind(listing_id)
          .run();

        const status = await update.txn?.wait();
        console.log(status);

        resolve({ success: true });
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

export default Listing;
