import { useReadContract } from "wagmi";
import exampleERC20L1 from "../data/exampleERC20L1Data.json";

export const useExampleERC20L1 = (address: `0x${string}`) => {
  const { data: symbol, isFetched: symbolFetched } = useReadContract({
    abi: exampleERC20L1.abi,
    address: exampleERC20L1.address as `0x${string}`,
    functionName: "symbol",
  });
  const balanceResult = useReadContract({
    abi: exampleERC20L1.abi,
    address: exampleERC20L1.address as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
  });

  return {
    balanceResult,
    symbol,
  };
};
