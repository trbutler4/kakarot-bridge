import { Button } from "./Button";
import { useBridge, useApprove, useExampleERC20L1 } from "../hooks";
import { useState } from "react";
import { useReadContract, useAccount } from "wagmi";

export const Bridge = () => {
  const [input, setInput] = useState<string>("");
  const [bridgeAmount, setBridgeAmount] = useState<BigInt>(BigInt("0"));
  const [variant, setVariant] = useState<"l1tol2" | "l2tol1">("l1tol2");
  const account = useAccount();

  const { balanceResult: l1BalanceResult, symbol } = useExampleERC20L1(
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
    switch (variant) {
      case "l1tol2":
        setInput(
          (BigInt(l1BalanceResult.data as string) / BigInt(1e18)).toString(),
        );
        setBridgeAmount(BigInt(l1BalanceResult.data as string));
        break;
      case "l2tol1":
        break;
    }
  };

  return (
    <BridgeView
      sourceTitle={variant === "l1tol2" ? "Ethereum L1" : "Kakarot L2"}
      destinationTitle={variant === "l1tol2" ? "Kakarot L2" : "Ethereum L1"}
      sourceBalance={
        variant === "l1tol2"
          ? l1BalanceResult.data
            ? (BigInt(l1BalanceResult.data as string) / BigInt(1e18)).toString()
            : "Balance"
          : "Balance"
      }
      sourceSymbol={symbol as string}
      handleInput={handleInput}
      currentValue={input}
      handleFillMax={handleFillMax}
      handleBridge={
        variant === "l1tol2"
          ? isApproved
            ? () => handleBridgeL1(bridgeAmount)
            : () => handleApprove(bridgeAmount)
          : () => console.log("l2tol1")
      }
      inputValid={inputValid}
    />
  );
};

interface BridgeViewProps {
  sourceTitle: string;
  destinationTitle: string;
  sourceBalance: string;
  sourceSymbol: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  currentValue: string;
  handleFillMax: () => void;
  handleBridge: () => void;
  inputValid: () => boolean;
}

const BridgeView = ({
  sourceTitle,
  destinationTitle,
  sourceBalance,
  sourceSymbol,
  handleInput,
  currentValue,
  handleFillMax,
  handleBridge,
  inputValid,
}: BridgeViewProps) => {
  return (
    <div className="w-2/3 h-2/3 border-2 rounded-xl p-6 max-w-[40vw] min-w-[400px] shadow-xl">
      <div className="flex flex-col justify-evenly space-y-4">
        <div>
          <div className="flex flex-row justify-between">
            <p className="font-semibold text-lg">{sourceTitle}</p>
            <p className="font-thin text-sm items-end">{sourceBalance}</p>
          </div>
          <div className="flex flex-row w-full">
            <div className="border rounded-s-md px-2 font-semibold flex justify-center items-center">
              {sourceSymbol}
            </div>
            <div className="border rounded-e-md px-2 w-full">
              <div className="flex flex-row justify-between">
                <input
                  type="text"
                  placeholder="Enter amount"
                  className="w-full font-light"
                  onChange={handleInput}
                  value={currentValue}
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
          <p className="font-semibold text-lg">{destinationTitle}</p>
          <p className="font-thin text-sm items-end"></p>
        </div>
      </div>
      <div className="w-full pt-8">
        <Button
          onClick={handleBridge}
          label="Bridge"
          className="font-bold tracking-wide text-kg text-kkrt_green text-opacity-90"
          disabled={!inputValid()}
        />
      </div>
    </div>
  );
};
