import hre from "hardhat";
import fs from "fs";
import path from "path";
import ExampleERC20L1Module from "../ignition/modules/exampleERC20L1";

const BRIDGE_L1_ADDRESS = process.env.BRIDGE_L1_ADDRESS;
if (!BRIDGE_L1_ADDRESS) {
  throw new Error("BRIDGE_L1_ADDRESS is not set in .env");
}

async function main() {
  const { ExampleERC20L1 } = await hre.ignition.deploy(ExampleERC20L1Module);
  const exampleErc20L1Address = await ExampleERC20L1.getAddress();
  console.log(`Example ERC20 L1 deployed to ${exampleErc20L1Address}`);

  const exampleERC20Artifact =
    "./ignition/deployments/chain-31337/artifacts/ExampleERC20L1Module#ExampleERC20L1.json";

  const file = fs.readFileSync(exampleERC20Artifact, "utf8");
  const json = JSON.parse(file);
  const abi = json.abi;
  const exampleERC20L1Data = "./frontend/src/data/exampleERC20L1Data.json";
  const exampleERC20L1Json = JSON.stringify({
    address: exampleErc20L1Address,
    abi: abi,
  });
  fs.writeFileSync(exampleERC20L1Data, exampleERC20L1Json);
}

main().catch(console.error);
