import hre from "hardhat";
import StarknetMessagingModule from "../ignition/modules/starknetMessaging";
import L1KakarotMessagingModule from "../ignition/modules/L1KakarotMessaging";
import BridgeL1Module from "../ignition/modules/bridgeL1";
import ExampleERC20L1Module from "../ignition/modules/exampleERC20L1";
import { getTestProvider, getTestAccount } from "./config";
import fs from "fs";

const provider = getTestProvider();
const account = getTestAccount(provider);

const KAKAROT_ADDRESS = process.env.KAKAROT_ADDRESS || "";
if (KAKAROT_ADDRESS === "") {
  throw new Error("KAKAROT_ADDRESS is not set in .env");
}

const updateFrontendData = (
  artifactPath: string,
  destPath: string,
  address: string,
) => {
  const file = fs.readFileSync(artifactPath, "utf8");
  const json = JSON.parse(file);
  const abi = json.abi;
  const contractData = JSON.stringify({ address, abi });
  fs.writeFileSync(destPath, contractData);
};

async function main() {
  const { starknetMessaging } = await hre.ignition.deploy(
    StarknetMessagingModule,
  );
  const starknetMessagingAddress = await starknetMessaging.getAddress();
  console.log(`StarknetMessaging deployed to: ${starknetMessagingAddress}.`);
  updateFrontendData(
    "./ignition/deployments/chain-31337/artifacts/StarknetMessagingModule#StarknetMessagingLocal.json",
    "./ui/src/data/starknetMessagingData.json",
    starknetMessagingAddress,
  );

  const { L1KakarotMessaging } = await hre.ignition.deploy(
    L1KakarotMessagingModule,
    { parameters: { L1KakarotMessaging: { starknetMessagingAddress } } },
  );
  const address = await L1KakarotMessaging.getAddress();
  await account.execute([
    {
      contractAddress: KAKAROT_ADDRESS,
      calldata: [address, true],
      entrypoint: "set_authorized_message_sender",
    },
  ]);
  console.log(
    `L1KakarotMessaging deployed to: ${address} and authorized for messages.`,
  );
  updateFrontendData(
    "./ignition/deployments/chain-31337/artifacts/L1KakarotMessaging#L1KakarotMessaging.json",
    "./ui/src/data/L1KakarotMessagingData.json",
    address,
  );

  const { ExampleERC20L1 } = await hre.ignition.deploy(ExampleERC20L1Module);
  const exampleErc20L1Address = await ExampleERC20L1.getAddress();
  console.log(`Example ERC20 L1 deployed to ${exampleErc20L1Address}`);
  updateFrontendData(
    "./ignition/deployments/chain-31337/artifacts/ExampleERC20L1Module#ExampleERC20.json",
    "./ui/src/data/exampleERC20L1Data.json",
    address,
  );

  const { bridgeL1 } = await hre.ignition.deploy(BridgeL1Module);
  const bridgeL1Address = await bridgeL1.getAddress();
  console.log(`BridgeL1 deployed to ${bridgeL1Address}`);
  updateFrontendData(
    "./ignition/deployments/chain-31337/artifacts/BridgeL1Module#BridgeL1.json",
    "./ui/src/data/bridgeL1Data.json",
    address,
  );
}

main().catch(console.error);
