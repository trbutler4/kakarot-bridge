//import fs from "fs";
const fs = require("fs");

async function main() {
  const getCmdArgs = () => process.argv.slice(2);
  const cmdArgs = getCmdArgs();
  if (cmdArgs.length < 1) {
    throw new Error("Missing bridge L2 address");
  }

  const bridgeL2Artifact =
    "artifacts/solidity_contracts/src/BridgeL2.sol/BridgeL2.json";
  const file = fs.readFileSync(bridgeL2Artifact, "utf8");
  const json = JSON.parse(file);
  const abi = json.abi;
  const bridgeL2Data = "./frontend/src/data/bridgeL2Data.json";
  const bridgeL2Json = JSON.stringify({ address: cmdArgs[0], abi: abi });
  fs.writeFileSync(bridgeL2Data, bridgeL2Json);
}

main().catch(console.error);
