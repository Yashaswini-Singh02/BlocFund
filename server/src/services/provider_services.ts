import { ethers } from "ethers";
import dotenv from "dotenv";
import { FundingContract } from "../utils/constants/contract";

dotenv.config();

const provider = new ethers.JsonRpcProvider(`https://1rpc.io/sepolia`);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY!, provider);

const contractABI = FundingContract.ABI;
const contractAddress = FundingContract.ADDRESS;

const contract = new ethers.Contract(contractAddress, contractABI, wallet);

export const getContract = () => contract;
