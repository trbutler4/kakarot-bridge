import { Button } from "./Button";
import { useBridge, useApprove, useExampleERC20L1 } from "../hooks";
import { useState } from "react";
import { useReadContract, useAccount } from "wagmi";

export const Bridge = () => {
  const [input, setInput] = useState<string>("");
  const [bridgeAmount, setBridgeAmount] = useState<BigInt>(BigInt("0"));
  const account = useAccount();

  const { balanceResult, symbol } = useExampleERC20L1(
    account.address as `0x${string}`,
  );

  const { handleBridgeL1 } = useBridge();

  const { handleApprove, isApproved } = useApprove();

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const v = e.target.value;
      setInput(v);

      const n = BigInt(parseInt(v) * 1e18);
      setBridgeAmount(n);
    } catch (e) {
      console.error(e);
    }
  };

  const inputValid = (): boolean => {
    // input contains only numbers
    return input.match(/^[0-9]+$/) !== null;
  };

  const handleFillMax = () => {
    setBridgeAmount(BigInt(balanceResult.data as string));
    setInput((BigInt(balanceResult.data as string) / BigInt(1e18)).toString());
  };

  return (
    <div className="w-2/3 h-2/3 border-2 rounded-xl p-6 max-w-[40vw] min-w-[400px]">
      <div className="flex flex-col justify-evenly space-y-4">
        <div>
          <div className="flex flex-row justify-between">
            <p className="font-semibold text-lg">Ethereum L1</p>
            <p className="font-thin text-sm items-end">
              {balanceResult.data
                ? (
                    BigInt(balanceResult.data as string) / BigInt(1e18)
                  ).toString()
                : 0}
            </p>
          </div>
          <div className="flex flex-row w-full">
            <div className="border rounded-s-md px-2 font-semibold flex justify-center items-center">
              {symbol as string}
            </div>
            <div className="border rounded-e-md px-2 w-full">
              <div className="flex flex-row justify-between">
                <input
                  type="text"
                  placeholder="Enter amount"
                  className="w-full font-light"
                  onChange={handleInput}
                  value={input}
                />
                {
                  <button
                    type="button"
                    onClick={handleFillMax}
                    className="opacity-50 font-light p-1"
                  >
                    max
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-lg">Kakarot L2</p>
          <p className="font-thin text-sm items-end"></p>
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
          disabled={!inputValid()}
        />
      </div>
    </div>
  );
};
