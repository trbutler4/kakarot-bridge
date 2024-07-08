import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import dotenv from "dotenv";
dotenv.config();

const BRIDGE_L1_ADDRESS = process.env.BRIDGE_L1_ADDRESS;
if (!BRIDGE_L1_ADDRESS) {
  throw new Error("KAKAROT_ADDRESS is not set in .env");
}

const ExampleERC20Module = buildModule("ExampleERC20Module", (m) => {
  const initialOwner = m.getParameter("initialOwner", BRIDGE_L1_ADDRESS);
  const ExampleERC20 = m.contract("ExampleERC20", [initialOwner]);

  return { ExampleERC20 };
});

export default ExampleERC20Module;
