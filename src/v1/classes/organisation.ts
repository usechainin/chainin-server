import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const organisationTable = process.env.TABLELAND_ORGANISATION_DATABASE;

class Organisation {
  success?: boolean;
  organisation_id?: number;
  organisation_name?: string;
  organisation_symbol?: string;
  description?: string;
  picture_url?: string;
  website_url?: string;
  creator_wallet_address?: string;
  nft_contract_address?: string;
  organisation_type?: string;

  constructor(organisation?: Organisation) {
    if (organisation) {
      this.set(organisation);
    }
  }

  set(organisation: Organisation) {
    if (organisation) {
      this.success = organisation.success;
      this.organisation_id = organisation.organisation_id;
      this.organisation_name = organisation.organisation_name;
      this.organisation_symbol = organisation.organisation_symbol;
      this.description = organisation.description;
      this.picture_url = organisation.picture_url;
      this.website_url = organisation.website_url;
      this.creator_wallet_address = organisation.creator_wallet_address;
      this.nft_contract_address = organisation.nft_contract_address;
      this.organisation_type = organisation.organisation_type;
    }
  }

  /////////////////////////////////////////
  //////////// CRUD OPERATIONS ////////////
  /////////////////////////////////////////

  // create an organisation
  create = async (): Promise<Object | Array<number>> => {
    const organisation = this;
    return new Promise<Object | Array<number>>(async (resolve, reject) => {
      try {
        const { error, meta: insert } = await db
          .prepare(
            `INSERT INTO ${organisationTable} (organisation_name, organisation_symbol, description, picture_url, website_url, creator_wallet_address, nft_contract_address, organisation_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?);`
          )
          .bind(
            organisation.organisation_name,
            organisation.organisation_symbol,
            organisation.description,
            organisation.picture_url,
            organisation.website_url,
            organisation.creator_wallet_address,
            organisation.nft_contract_address,
            organisation.organisation_type
          )
          .run();

        const status = await insert.txn?.wait();
        console.log(status);

        const { results } = await db
          .prepare(
            `SELECT * FROM ${organisationTable} ORDER BY organisation_id DESC LIMIT 1;`
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

  // get all organisations
  read = async (): Promise<Organisation | undefined> => {
    return new Promise<Organisation | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(`SELECT * FROM ${organisationTable}`)
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

  // get organisation by organisation_name
  readByOrganisationName = async (
    organisation_name: string
  ): Promise<Organisation | Object> => {
    console.log(organisation_name, "wats organisation name?");
    return new Promise<Organisation | Object>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(
            `SELECT * FROM ${organisationTable} WHERE organisation_name = ?1`
          )
          .bind(organisation_name)
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

  // get organisation by organisation_symbol
  readByOrganisationSymbol = async (
    organisation_symbol: string
  ): Promise<Organisation | Object> => {
    console.log(organisation_symbol, "wats organisation symbol?");
    return new Promise<Organisation | Object>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(
            `SELECT * FROM ${organisationTable} WHERE organisation_symbol = ?1`
          )
          .bind(organisation_symbol)
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

  // update organisation by organisation_id
  updateByOrganisationId = async (
    organisation_id: number,
    organisation: Organisation
  ): Promise<Object> => {
    return new Promise<Object>(async (resolve, reject) => {
      try {
        const { error, meta: update } = await db
          .prepare(
            `UPDATE ${organisationTable} SET organisation_name = ?, organisation_symbol = ?, description = ?, picture_url = ?, website_url = ?, creator_wallet_address = ?, nft_contract_address = ?, organisation_type = ? WHERE organisation_id = ?;`
          )
          .bind(
            organisation.organisation_name,
            organisation.organisation_symbol,
            organisation.description,
            organisation.picture_url,
            organisation.website_url,
            organisation.creator_wallet_address,
            organisation.nft_contract_address,
            organisation.organisation_type,
            organisation_id
          )
          .run();

        const status = await update.txn?.wait();
        console.log(status);

        const { results } = await db
          .prepare(
            `SELECT * FROM ${organisationTable} WHERE organisation_id = ?;`
          )
          .bind(organisation_id)
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

  // delete organisation by organisation_id
  deleteByOrganisationId = async (organisation_id: number): Promise<Object> => {
    return new Promise<Object>(async (resolve, reject) => {
      try {
        const { error, meta: update } = await db
          .prepare(
            `DELETE FROM ${organisationTable} WHERE organisation_id = ?;`
          )
          .bind(organisation_id)
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

export default Organisation;
