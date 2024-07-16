import { Button } from "./Button";
import {
  useBridge,
  useApprove,
  useExampleERC20L1,
  useExampleERC20L2,
} from "../hooks";
import { useState } from "react";
import { useAccount, useSwitchChain } from "wagmi";
import { useEffect } from "react";

export const Bridge = () => {
  const [input, setInput] = useState<string>("");
  const [bridgeAmount, setBridgeAmount] = useState<BigInt>(BigInt("0"));
  const [variant, setVariant] = useState<"l1tol2" | "l2tol1">("l1tol2");
  const account = useAccount();
  const { switchChain } = useSwitchChain();

  useEffect(() => {
    switch (variant) {
      case "l1tol2":
        switchChain({ chainId: 31337 });
        break;
      case "l2tol1":
        switchChain({ chainId: 1263227476 });
        break;
    }
  }, [variant]);

  const { balanceResult: l1BalanceResult, symbol } = useExampleERC20L1(
    account.address as `0x${string}`,
  );

  const { balanceResult: l2BalanceResult, symbol: l2Symbol } =
    useExampleERC20L2(account.address as `0x${string}`);

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

  const handleFillMax = () => {
    const updateInput = (balance: string) => {
      setInput((BigInt(balance) / BigInt(1e18)).toString());
      setBridgeAmount(BigInt(balance));
    };
    switch (variant) {
      case "l1tol2":
        updateInput(l1BalanceResult.data as string);
        break;
      case "l2tol1":
        updateInput(l2BalanceResult.data as string);
        break;
    }
  };

  const handleSwapVariant = () => {
    switch (variant) {
      case "l1tol2":
        setVariant("l2tol1");
        break;
      case "l2tol1":
        setVariant("l1tol2");
        break;
    }
  };

  const parseBalance = (balance: string) => {
    return (BigInt(balance) / BigInt(1e18)).toString();
  };

  return (
    <BridgeView
      sourceTitle={variant === "l1tol2" ? "Ethereum L1" : "Kakarot L2"}
      destinationTitle={variant === "l1tol2" ? "Kakarot L2" : "Ethereum L1"}
      sourceBalance={
        variant === "l1tol2"
          ? l1BalanceResult.data
            ? parseBalance(l1BalanceResult.data as string)
            : "Balance"
          : l2BalanceResult.data
            ? parseBalance(l2BalanceResult.data as string)
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
      bridgeButtonLabel={
        variant === "l1tol2" ? (isApproved ? "Bridge" : "Approve") : "Bridge"
      }
      handleSwapVariant={handleSwapVariant}
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
  handleSwapVariant: () => void;
  bridgeButtonLabel: string;
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
  handleSwapVariant,
  bridgeButtonLabel,
}: BridgeViewProps) => {
  const inputValid = (): boolean => {
    // input contains only numbers
    return currentValue.match(/^[0-9]+$/) !== null;
  };
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
        <div className="flex justify-center items-center  py-4">
          <Button
            onClick={handleSwapVariant}
            label="Switch bridge direction"
            className="text-kkrt_green text-opacity-90 h-6 text-sm w-52"
          />
        </div>
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-lg">{destinationTitle}</p>
          <p className="font-thin text-sm items-end"></p>
        </div>
      </div>
      <div className="w-full pt-8">
        <Button
          onClick={handleBridge}
          label={bridgeButtonLabel}
          className="font-bold tracking-wide text-kg text-kkrt_green text-opacity-90"
          disabled={!inputValid()}
        />
      </div>
    </div>
  );
};
