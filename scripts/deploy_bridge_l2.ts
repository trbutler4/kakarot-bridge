import hre from "hardhat";
import BridgeL2Module from "../ignition/modules/bridgeL2";

const KAKAROT_ADDRESS = process.env.KAKAROT_ADDRESS || "";
if (KAKAROT_ADDRESS === "") {
  throw new Error("KAKAROT_ADDRESS is not set in .env");
}

async function main() {
  const { bridgeL2 } = await hre.ignition.deploy(BridgeL2Module);
  const bridgeL2Address = await bridgeL2.getAddress(); 
  console.log(`BridgeL2 deployed to ${bridgeL2Address}`)

}

main().catch(console.error);