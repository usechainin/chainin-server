import db from "../../config";
import dotenv from "dotenv";
dotenv.config();

const userTable = process.env.TABLELAND_USER_DATABASE;

class User {
  success?: boolean;
  wallet_address?: string;
  first_name?: string;
  last_name?: string;
  email_address?: string;
  biography?: string;

  constructor(user?: {
    success?: boolean;
    wallet_address?: string;
    first_name?: string;
    last_name?: string;
    email_address?: string;
    biography?: string;
  }) {
    this.set(user);
  }
    set(user?: {
    success?: boolean;
    wallet_address?: string;
    first_name?: string;
    last_name?: string;
    email_address?: string;
    biography?: string;
  }) {
    if (user !== undefined) {
      this.success = user.success;
      this.wallet_address = user.wallet_address;
      this.first_name = user.first_name;
      this.last_name = user.last_name;
      this.email_address = user.email_address;
      this.biography = user.biography;
    }
  }

  /////////////////////////////////////////
  //////////// CRUD OPERATIONS ////////////
  /////////////////////////////////////////

  // create a new user
  create = async (): Promise<User | undefined> => {
    const user = this;
    return new Promise<User | undefined>(async (resolve, reject) => {
      try {
        const { results } = await db
          .prepare(`SELECT * FROM ${userTable} WHERE wallet_address = ?1`)
          .bind(user.wallet_address)
          .all();

        if (results.length > 0) {
          reject("Wallet Address already exists");
        } else {
          // Insert a row into the table
          const { error, meta: insert } = await db
            .prepare(
              `INSERT INTO ${userTable} (wallet_address, first_name, last_name, email_address, biography) VALUES (?, ?, ?, ?, ?);`
            )
            .bind(user.wallet_address, user.first_name, user.last_name, user.email_address, user.biography)
            .run();

          // Wait for transaction finality
          const status = await insert.txn?.wait();
          console.log(status, "status of waiting for tx");

          const newUser = new User({
            success: true,
            wallet_address: user.wallet_address,
            first_name: user.first_name,
            last_name: user.last_name,
            email_address: user.email_address,
            biography: user.biography,
          });

          resolve(newUser);
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
  
  // get all users
  read = async (): Promise<User | undefined> => {
    return new Promise<User | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(`SELECT * FROM ${userTable}`)
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

  // get user by wallet_address
  readByWalletAddress = async (wallet_address: string): Promise<User | undefined> => {
    console.log(wallet_address, "wats wallet address?");
    return new Promise<User | undefined>(async (resolve, reject) => {
      try {
        const results: any = await db
          .prepare(`SELECT * FROM ${userTable} WHERE wallet_address = ?1`)
          .bind(wallet_address)
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

  // update user by wallet_address
  updateByWalletAddress = async (wallet_address: string, user: User): Promise<User | undefined> => {
    return new Promise<User | undefined>(async (resolve, reject) => {
      try {
        const { error, meta: update } = await db
          .prepare(
            `UPDATE ${userTable} SET first_name = ?, last_name = ?, email_address = ?, biography = ? WHERE wallet_address = ?;`
          )
          .bind(user.first_name, user.last_name, user.email_address, user.biography, wallet_address)
          .run();

        // Wait for transaction finality
        const status = await update.txn?.wait();
        console.log(status, "status of waiting for tx");

        const updatedUser = new User({
          success: true,
          wallet_address: wallet_address,
          first_name: user.first_name,
          last_name: user.last_name,
          email_address: user.email_address,
          biography: user.biography,
        });

        resolve(updatedUser);
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

  // delete user by wallet_address
  deleteByWalletAddress = async (wallet_address: string): Promise<User | undefined> => {
    return new Promise<User | undefined>(async (resolve, reject) => {
      try {
        const { error, meta: del } = await db
          .prepare(`DELETE FROM ${userTable} WHERE wallet_address = ?;`)
          .bind(wallet_address)
          .run();

        // Wait for transaction finality
        const status = await del.txn?.wait();
        console.log(status, "status of waiting for tx");

        const deletedUser = new User({
          success: true,
          wallet_address: wallet_address,
        });

        resolve(deletedUser);
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

export default User;
