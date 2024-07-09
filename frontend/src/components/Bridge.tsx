import bridgeL1 from "../data/bridgeL1Data.json";
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

  const {
    data: approveHash,
    writeContract: writeApprove,
    isError: isApproveError,
    error: approveError,
    isPending: isApprovePending,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash: bridgeL1Hash,
    });

  const { isLoading: isApproving, isSuccess: isApproved } =
    useWaitForTransactionReceipt({
      hash: approveHash,
    });

  const handleBridgeL1 = () => {
    console.log("Initiating bridge L1 to L2...");
    const value = BigInt(0.0001 * 1e18);
    writeContractBridgeL1({
      address: bridgeL1.address as `0x${string}`,
      abi: bridgeL1.abi,
      functionName: "bridgeToL2",
      args: [bridgeL2Config.address, exampleERC20L2.address, 100],
      value: value,
    });
  };

  const handleApprove = () => {
    console.log("Approving token spend...");
    writeApprove({
      address: exampleERC20L1.address as `0x${string}`,
      abi: exampleERC20L1.abi,
      functionName: "approve",
      args: [bridgeL1.address, 100],
    });
  };

  return (
    <div className="flex flex-col">
      <h1>Bridge</h1>

      <button onClick={() => handleApprove()}>Approve</button>
      {isApproving && <div>Approving...</div>}
      {isApproved && <div>Approved!</div>}
      {isApproveError && <div>{JSON.stringify(approveError, null, 2)}</div>}

      <button onClick={handleBridgeL1}>Bridge to L2</button>
      {isBridgeL1Pending && <div>Loading...</div>}
      {isConfirming && <div>Confirming...</div>}
      {isConfirmed && <div>Transaction confirmed</div>}
      {bridgeL1Hash && <div>{JSON.stringify(bridgeL1Hash, null, 2)}</div>}
      {isBridgeL1Error && <div>{JSON.stringify(bridgeL1Error, null, 2)}</div>}
    </div>
  );
};
