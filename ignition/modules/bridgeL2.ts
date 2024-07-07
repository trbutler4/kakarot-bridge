import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const BridgeL2Module = buildModule("BridgeL2Module", (m) => {
  const bridgeL2 = m.contract("BridgeL2");
  return { bridgeL2 };
});

export default BridgeL2Module;