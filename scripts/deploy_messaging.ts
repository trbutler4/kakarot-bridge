import hre from "hardhat";
import StarknetMessagingModule from "../ignition/modules/starknetMessaging";
import L1KakarotMessagingModule from "../ignition/modules/L1KakarotMessaging";
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
    "ignition/deployments/chain-31337/artifacts/StarknetMessagingModule#StarknetMessagingLocal.json",
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
    "/Users/iv-personal/Projects/kakarot-bridge/ignition/deployments/chain-31337/artifacts/L1KakarotMessaging#L1KakarotMessaging.json",
    "./ui/src/data/L1KakarotMessagingData.json",
    address,
  );
}

main().catch(console.error);
