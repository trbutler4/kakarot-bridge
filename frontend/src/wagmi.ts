import { http, createConfig } from "wagmi";
import { kakarotSepolia } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { defineChain } from "viem";

export const kakarotLocal = defineChain({
  id: 31337,
  name: "Kakarot Local",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["http://localhost:8545"] },
  },
});

export const config = createConfig({
  chains: [kakarotSepolia, kakarotLocal],
  connectors: [injected()],
  transports: {
    [kakarotSepolia.id]: http(),
    [kakarotLocal.id]: http(),
  },
});

declare module "wagmi" {
  interface Register {
    config: typeof config;
  }
}
