import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const dummy_addr = "0x0000000000000000000000000000000000000000"

const BridgeL1Module = buildModule("BridgeL1Module", (m) => {
  const bridgeL1 = m.contract("BridgeL1", [dummy_addr, dummy_addr, dummy_addr]);
  return { bridgeL1 };
});

export default BridgeL1Module;
