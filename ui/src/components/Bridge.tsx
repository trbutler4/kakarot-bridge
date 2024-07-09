import { Button } from "./Button";
import { useBridge, useApprove } from "../hooks";

export const Bridge = () => {
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

  const handleFillMax = () => {
    // TODO
    throw new Error("not implemented");
  };

  const balance = "0.000"; // TODO: fetch balance

  const TokenInput = ({ ticker, label }: { ticker: string; label: string }) => {
    return (
      <div>
        <div className="flex flex-row justify-between">
          <p className="font-semibold text-lg">{label}</p>
          <p className="font-thin text-sm items-end">{balance}</p>
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
              <button
                type="button"
                onClick={handleFillMax}
                className="opacity-50 font-light p-1"
              >
                max
              </button>
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
          onClick={() => console.log("TODO")}
          label="Bridge"
          className="font-bold tracking-wide text-xl text-kkrt_green"
        />
      </div>
    </div>
  );
};
