//import fs from "fs";
const fs = require("fs");

async function main() {
  const getCmdArgs = () => process.argv.slice(2);
  const cmdArgs = getCmdArgs();
  if (cmdArgs.length < 1) {
    throw new Error("Missing bridge L2 address");
  }

  const exampleERC20Artifact =
    "artifacts/solidity_contracts/src/ExampleERC20.sol/ExampleERC20.json";
  const file = fs.readFileSync(exampleERC20Artifact, "utf8");
  const json = JSON.parse(file);
  const abi = json.abi;
  const exampleERC20Data = "./ui/src/data/ExampleERC20L2Data.json";
  const contractAddress = cmdArgs[0];
  const exampleERC20Json = JSON.stringify({
    address: contractAddress,
    abi: abi,
  });
  fs.writeFileSync(exampleERC20Data, exampleERC20Json);
}

main().catch(console.error);
