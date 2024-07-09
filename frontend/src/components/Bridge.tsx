import bridgeL1Config from "../data/bridgeL1Data.json";
import starknetMessagingData from "../data/starknetMessagingData.json";
import exampleERC20L2 from "../data/ExampleERC20L2Data.json";
import exampleERC20L1 from "../data/exampleERC20L1Data.json";

import bridgeL2Config from "../data/bridgeL2Data.json";

import { useWriteContract } from "wagmi";
import { useWaitForTransactionReceipt } from "wagmi";

export const Bridge = () => {
  const {
    data: bridgeL1Hash,
    writeContract: writeContractBridgeL1,
    isError: isBridgeL1Error,
    error: bridgeL1Error,
    isPending: isBridgeL1Pending,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: bridgeL1Hash,
    });

  const handleBridgeL1 = () => {
    console.log("Initiating bridge L1 to L2...");
    const value = BigInt(0.0001 * 1e18); // TODO: accept this as an input
    writeContractBridgeL1({
      address: bridgeL1Config.address as `0x${string}`,
      abi: bridgeL1Config.abi,
      functionName: "bridgeToL2",
      args: [
        bridgeL2Config.address,
        exampleERC20L1.address,
        exampleERC20L2.address,
      ],
      value: value,
    });
  };

  return (
    <div>
      <h1>Bridge</h1>
      <button onClick={handleBridgeL1}>Bridge to L2</button>
      {isBridgeL1Pending && <div>Loading...</div>}
      {isConfirming && <div>Confirming...</div>}
      {isConfirmed && <div>Transaction confirmed</div>}
      {bridgeL1Hash && <div>{JSON.stringify(bridgeL1Hash)}</div>}
      {isBridgeL1Error && <div>{JSON.stringify(bridgeL1Error)}</div>}
    </div>
  );
};
