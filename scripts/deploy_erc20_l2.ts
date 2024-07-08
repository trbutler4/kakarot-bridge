import hre from "hardhat";
import fs from "fs";
import path from "path";
import ExampleERC20Module from "../ignition/modules/exampleERC20";

const BRIDGE_L1_ADDRESS = process.env.BRIDGE_L1_ADDRESS;
if (!BRIDGE_L1_ADDRESS) {
  throw new Error("BRIDGE_L1_ADDRESS is not set in .env");
}

async function main() {
  const { ExampleERC20 } = await hre.ignition.deploy(ExampleERC20Module);
  const exampleErc20Address = await ExampleERC20.getAddress();
  console.log(`Example ERC20 deployed to ${exampleErc20Address}`);

  const exampleERC20Artifact =
    "./ignition/deployments/chain-31337/artifacts/ExampleERC20Module#ExampleERC20.json";

  const file = fs.readFileSync(exampleERC20Artifact, "utf8");
  const json = JSON.parse(file);
  const abi = json.abi;
  const bridgeL1Data = "./frontend/src/data/exampleERC20L1Data.json";
  const bridgeL1Json = JSON.stringify({
    address: exampleErc20Address,
    abi: abi,
  });
  fs.writeFileSync(bridgeL1Data, bridgeL1Json);
}

main().catch(console.error);
