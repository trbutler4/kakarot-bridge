import hre from "hardhat";
import BridgeL2Module from "../ignition/modules/bridgeL2";
import fs from "fs"

const KAKAROT_ADDRESS = process.env.KAKAROT_ADDRESS || "";
if (KAKAROT_ADDRESS === "") {
  throw new Error("KAKAROT_ADDRESS is not set in .env");
}

async function main() {
  hre.ignition.deploy(BridgeL2Module);
  //const bridgeL2Address = await bridgeL2.getAddress(); 
  //console.log(`BridgeL2 deployed to ${bridgeL2Address}`)
  console.log("Bridge layer 2 deployed")

  const bridgeL2Artifact = "./ignition/deployments/chain-1263227476/artifacts/BridgeL2Module#BridgeL2.json"
  const file = fs.readFileSync(bridgeL2Artifact, "utf8")
  const json = JSON.parse(file)
  const abi = json.abi
  const bridgeL2Data = "./frontend/src/data/bridgeL2Data.json"
  //const bridgeL2Json = JSON.stringify({ address: bridgeL2Address, abi: abi})
  const bridgeL2Json = JSON.stringify({ address: "", abi: abi})
  fs.writeFileSync(bridgeL2Data, bridgeL2Json)
}

main().catch(console.error);