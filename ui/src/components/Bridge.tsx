import { Button } from "./Button";
import { useBridge, useApprove } from "../hooks";
import { useEffect, useState } from "react";
import { useBalance, useReadContract, useAccount } from "wagmi";
import exampleERC20L1 from "../data/exampleERC20L1Data.json";

export const Bridge = () => {
  const [bridgeAmount, setBridgeAmount] = useState<number>(0);
  const account = useAccount();

  const {
    data: balance,
    isError: isBalanceError,
    error: balanceError,
    isFetched: balanceFetched,
  } = useReadContract({
    abi: exampleERC20L1.abi,
    address: exampleERC20L1.address as `0x${string}`,
    functionName: "balanceOf",
    args: [account.address],
  });
  if (isBalanceError) {
    console.error(balanceError);
  }

  const {
    handleBridgeL1,
    isConfirming,
    isConfirmed,
    isBridgeL1Error,
    bridgeL1Error,
    isBridgeL1Pending,
  } = useBridge();

  const {
    handleApprove,
    isApproved,
    isApproving,
    isApproveError,
    approveError,
  } = useApprove();

  const TokenInput = ({ ticker, label }: { ticker: string; label: string }) => {
    return (
      <div>
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-lg">{label}</p>
          <p className="font-thin text-sm items-end">
            {balanceFetched && balance}
          </p>
        </div>
        <div className="flex flex-row w-full">
          <div className="border rounded-s-md px-2 font-semibold flex justify-center items-center">
            {ticker}
          </div>
          <div className="border rounded-e-md px-2 w-full">
            <div className="flex flex-row justify-between">
              <input
                type="text"
                placeholder="Enter amount"
                className="w-full font-light"
              />
              {/*

                <button
                  type="button"
                  onClick={handleFillMax}
                  className="opacity-50 font-light p-1"
                >
                  max
                </button>
                */}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-2/3 h-2/3 border-2 rounded-xl p-6 max-w-[40vw] min-w-[400px]">
      <div className="flex flex-col justify-evenly space-y-4">
        <TokenInput ticker="$TEST" label="Ethereum L1" />
        <TokenInput ticker="$TEST" label="Kakarot L2" />
      </div>
      <div className="w-full pt-8">
        <Button
          onClick={
            isApproved
              ? () => handleBridgeL1(bridgeAmount)
              : () => handleApprove(bridgeAmount)
          }
          label={isApproved ? "Bridge" : "Approve"}
          className="font-bold tracking-wide text-kg text-kkrt_green text-opacity-90"
        />
      </div>
      {!isApproved && isApproving && <p>Approving...</p>}
      {!isApproved && isApproveError && (
        <p>{JSON.stringify(approveError, null, 2)}</p>
      )}
    </div>
  );
};
