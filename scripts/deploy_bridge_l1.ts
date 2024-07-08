import hre from "hardhat";
import BridgeL1Module from "../ignition/modules/bridgeL1";
import fs from "fs"
import path from "path"

const KAKAROT_ADDRESS = process.env.KAKAROT_ADDRESS || "";
if (KAKAROT_ADDRESS === "") {
  throw new Error("KAKAROT_ADDRESS is not set in .env");
}

async function main() {
  const { bridgeL1 } = await hre.ignition.deploy(BridgeL1Module);
  const bridgeL1Address = await bridgeL1.getAddress(); 
  console.log(`BridgeL1 deployed to ${bridgeL1Address}`)

  const bridgeL1Artifact = "./ignition/deployments/chain-31337/artifacts/BridgeL1Module#BridgeL1.json"

  const file = fs.readFileSync(bridgeL1Artifact, "utf8")
  const json = JSON.parse(file)
  const abi = json.abi
  const bridgeL1Data = "./frontend/src/data/bridgeL1Data.json"
  const bridgeL1Json = JSON.stringify({ address: bridgeL1Address, abi: abi})
  fs.writeFileSync(bridgeL1Data, bridgeL1Json)
}

main().catch(console.error);