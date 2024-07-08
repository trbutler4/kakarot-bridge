import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const l1KakarotMessagingAddress = process.env.L1_KAKAROT_MESSAGING_ADDRESS;
const kakarotAddress = process.env.KAKAROT_ADDRESS;

if (!l1KakarotMessagingAddress || !kakarotAddress) {
  throw new Error(
    "STARKNET_MESSAGING_ADDRESS, L1_KAKAROT_MESSAGING_ADDRESS, and KAKAROT_ADDRESS need to be set in .env file",
  );
}

const BridgeL1Module = buildModule("BridgeL1Module", (m) => {
  const bridgeL1 = m.contract("BridgeL1", [
    l1KakarotMessagingAddress,
    kakarotAddress,
  ]);
  return { bridgeL1 };
});

export default BridgeL1Module;
