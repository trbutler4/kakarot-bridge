import { useAccount, useConnect, useDisconnect } from "wagmi";

export const ConnectButton = () => {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();
  const handleConnection = () => {
    if (account.status === "connected") {
      disconnect();
    } else {
      connect({ connector: connectors[0] });
    }
  };

  const truncatedAddr = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(38)}`;
  };

  return (
    <button
      type="button"
      onClick={handleConnection}
      className="p-2 bg-kkrt_orange rounded-xl px-4"
    >
      {account.status === "connected"
        ? truncatedAddr(account.address)
        : "Connect"}
    </button>
  );
};
