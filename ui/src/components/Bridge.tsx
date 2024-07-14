import { Button } from "./Button";
import { useBridge, useApprove } from "../hooks";
import { useEffect, useState } from "react";
import { useBalance, useReadContract, useAccount } from "wagmi";
import exampleERC20L1 from "../data/exampleERC20L1Data.json";
import exampleERC20L2 from "../data/ExampleERC20L2Data.json";

export const Bridge = () => {
  const [bridgeAmount, setBridgeAmount] = useState<number | undefined>();
  const account = useAccount();

  const l1BalanceResult = useReadContract({
    abi: exampleERC20L1.abi,
    address: exampleERC20L1.address as `0x${string}`,
    functionName: "balanceOf",
    args: [account.address],
  });
  if (l1BalanceResult.isError) {
    console.error(l1BalanceResult.error);
  }

  const l2BalanceResult = useReadContract({
    abi: exampleERC20L2.abi,
    address: exampleERC20L2.address as `0x${string}`,
    functionName: "balanceOf",
    args: [account.address],
  });
  if (l2BalanceResult.isError) {
    console.error(l2BalanceResult.error);
  }

  const { data: symbol, isFetched: symbolFetched } = useReadContract({
    abi: exampleERC20L1.abi,
    address: exampleERC20L1.address as `0x${string}`,
    functionName: "symbol",
  });

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

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const v = e.target.value;
      const n = parseInt(v);
      if (typeof n === "number") {
        setBridgeAmount(n);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="w-2/3 h-2/3 border-2 rounded-xl p-6 max-w-[40vw] min-w-[400px]">
      <div className="flex flex-col justify-evenly space-y-4">
        <div>
          <div className="flex flex-row justify-between">
            <p className="font-semibold text-lg">Ethereum L1</p>
            <p className="font-thin text-sm items-end">
              {l1BalanceResult.data
                ? (l1BalanceResult.data as BigInt).toString()
                : 0}
            </p>
          </div>
          <div className="flex flex-row w-full">
            <div className="border rounded-s-md px-2 font-semibold flex justify-center items-center">
              {symbolFetched && (symbol as string)}
            </div>
            <div className="border rounded-e-md px-2 w-full">
              <div className="flex flex-row justify-between">
                <input
                  type="text"
                  placeholder="Enter amount"
                  className="w-full font-light"
                  onChange={handleInput}
                  value={bridgeAmount}
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
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-lg">Kakarot L2</p>
          <p className="font-thin text-sm items-end">
            {/*
              {l2BalanceResult.data
                ? (l2BalanceResult.data as BigInt).toString()
                : 0}
              */}
            0
          </p>
        </div>
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
    </div>
  );
};
