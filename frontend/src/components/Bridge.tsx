import { useBridgeL1 } from "../hooks/useBridgeL1";

import bridgeL1Config from "../data/bridgeL1Data.json";
import starknetMessagingData from "../data/starknetMessagingData.json";

import { useWriteContract } from "wagmi";

export const Bridge = () => {
  const {
    data: bridgeL1Data,
    writeContract: writeContractBridgeL1,
    isError: isBridgeL1Error,
    error: bridgeL1Error,
  } = useWriteContract();

  const handleBridgeL1 = () => {
    console.log("Initiating bridge L1 to L2...");
    const message = 1; // TODO: update this to be calldata for minting erc20s
    const value = BigInt(0.0001 * 1e18); // TODO: accept this as an input
    writeContractBridgeL1({
      address: bridgeL1Config.address as `0x${string}`,
      abi: bridgeL1Config.abi,
      functionName: "bridgeToL2",
      args: [starknetMessagingData.address],
      value: value,
    });
  };

  return (
    <div>
      <h1>Bridge</h1>
      <button onClick={handleBridgeL1}>Bridge to L2</button>
      {bridgeL1Data && <div>{JSON.stringify(bridgeL1Data, null, 2)}</div>}
      {isBridgeL1Error && <div>{JSON.stringify(bridgeL1Error)}</div>}
    </div>
  );
};
