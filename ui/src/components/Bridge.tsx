import { Button } from "./Button";

export const Bridge = () => {
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
    <div className="w-2/3 h-2/3 border-2 rounded-xl p-6 max-w-[40vw]">
      <div className="flex flex-col justify-evenly space-y-4">
        <TokenInput ticker="$TEST" label="Ethereum L1" />
        <TokenInput ticker="$TEST" label="Kakarot L2" />
      </div>
      <div className="w-full pt-8">
        <Button onClick={() => console.log("TODO")} label="Bridge" />
      </div>
    </div>
  );

  return (
    <div className="flex flex-col">
      <h1>Bridge</h1>

      <button onClick={handleApprove}>Approve</button>
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
