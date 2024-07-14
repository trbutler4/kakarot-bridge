import bridgeL1 from "../data/bridgeL1Data.json";
import exampleERC20L2 from "../data/ExampleERC20L2Data.json";
import exampleERC20L1 from "../data/exampleERC20L1Data.json";
import bridgeL2Config from "../data/bridgeL2Data.json";
import { useWriteContract } from "wagmi";
import { useWaitForTransactionReceipt } from "wagmi";

export const useBridge = () => {
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

  const handleBridgeL1 = (amount: BigInt) => {
    console.log("Initiating bridge L1 to L2...");
    const value = BigInt(0.0001 * 1e18);
    writeContractBridgeL1({
      address: bridgeL1.address as `0x${string}`,
      abi: bridgeL1.abi,
      functionName: "bridgeToL2",
      args: [
        bridgeL2Config.address,
        exampleERC20L2.address,
        exampleERC20L1.address,
        amount,
      ],
      value: value,
    });
  };

  return {
    handleBridgeL1,
    isBridgeL1Error,
    bridgeL1Error,
    isBridgeL1Pending,
    isConfirming,
    isConfirmed,
  };
};
