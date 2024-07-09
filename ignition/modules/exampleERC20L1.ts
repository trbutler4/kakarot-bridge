import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from "dotenv";
dotenv.config();

const BRIDGE_L1_ADDRESS = process.env.BRIDGE_L1_ADDRESS;
if (!BRIDGE_L1_ADDRESS) {
  throw new Error("BRIDGE_L1_ADDRESS is not set in .env");
}

const MM_DEV_WALLET = process.env.MM_DEV_WALLET;
if (!MM_DEV_WALLET) {
  throw new Error("MM_DEV_WALLET is not set in .env");
}

const ExampleERC20L1Module = buildModule("ExampleERC20L1Module", (m) => {
  const fundingAccount = m.getParameter("fundingAccount", MM_DEV_WALLET);
  const ExampleERC20L1 = m.contract("ExampleERC20", [fundingAccount]);

  return { ExampleERC20L1 };
});

export default ExampleERC20L1Module;
