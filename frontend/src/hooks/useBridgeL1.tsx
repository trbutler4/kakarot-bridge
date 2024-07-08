import bridgeL1Config from "../data/bridgeL1Data.json";
import starknetMessagingData from "../data/starknetMessagingData.json";

import { useWriteContract } from "wagmi";

export const useBridgeL1 = () => {
  const {
    data: bridgeL1Data,
    writeContract,
    isError: isBridgeL1Error,
    error: bridgeL1Error,
  } = useWriteContract();

  const handleBridgeL1 = () => {
    console.log("Initiating bridge L1 to L2...");
    const message = 1; // TODO: update this to be calldata for minting erc20s
    const value = BigInt(0.0001 * 1e18); // TODO: accept this as an input
    writeContract({
      address: bridgeL1Config.address as `0x${string}`,
      abi: bridgeL1Config.abi,
      functionName: "bridgeToL2",
      args: [starknetMessagingData.address],
    });
  };

  return { handleBridgeL1, bridgeL1Data, isBridgeL1Error, bridgeL1Error };
};
