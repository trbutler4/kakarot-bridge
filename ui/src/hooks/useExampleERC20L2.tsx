import { useReadContract } from "wagmi";
import exampleERC20L2 from "../data/ExampleERC20L2Data.json";

export const useExampleERC20L2 = (address: `0x${string}`) => {
  const { data: symbol, isFetched: symbolFetched } = useReadContract({
    abi: exampleERC20L2.abi,
    address: exampleERC20L2.address as `0x${string}`,
    functionName: "symbol",
  });
  const balanceResult = useReadContract({
    abi: exampleERC20L2.abi,
    address: exampleERC20L2.address as `0x${string}`,
    functionName: "balanceOf",
    args: [address],
  });

  return {
    balanceResult,
    symbol,
  };
};
