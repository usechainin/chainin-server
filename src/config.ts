import { Database } from "@tableland/sdk";
import { Wallet, getDefaultProvider } from "ethers";
import dotenv from "dotenv";
dotenv.config();

const maticMumbai = `https://polygon-mumbai.g.alchemy.com/v2/${process.env.MATIC_API_KEY}`
// const ethSepolia = `https://eth-sepolia.g.alchemy.com/v2/${process.env.SEPOLIA_API_KEY}`

const wallet = new Wallet(process.env.WALLET_PRIVATE_KEY || "");
const provider = getDefaultProvider(maticMumbai);
const signer = wallet.connect(provider);
const db = new Database({ signer });

export default db;