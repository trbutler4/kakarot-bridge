import bridgeL1 from "../data/bridgeL1Data.json";
import exampleERC20L1 from "../data/exampleERC20L1Data.json";
import { useWriteContract } from "wagmi";
import { useWaitForTransactionReceipt } from "wagmi";

export const useApprove = () => {
  const {
    data: approveHash,
    writeContract: writeApprove,
    isError: isApproveError,
    error: approveError,
    isPending: isApprovePending,
  } = useWriteContract();

  const { isLoading: isApproving, isSuccess: isApproved } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    });

  const handleApprove = (amount: number) => {
    console.log("Approving token spend...");
    writeApprove({
      address: exampleERC20L1.address as `0x${string}`,
      abi: exampleERC20L1.abi,
      functionName: "approve",
      args: [bridgeL1.address, amount],
    });
  };

  return {
    handleApprove,
    isApproving,
    isApproved,
    isApproveError,
    approveError,
    isApprovePending,
  };
};
