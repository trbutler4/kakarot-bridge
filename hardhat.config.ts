import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@nomicfoundation/hardhat-foundry";
import dotenv from "dotenv";
dotenv.config();

/*
task("balance", "Prints an account's balance")
  .addParam("account", "The account's address")
  .setAction(async (taskArgs) => {
    const balance = await ethers.provider.getBalance(taskArgs.account);

    console.log(ethers.formatEther(balance), "ETH");
  });

*/
const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    kakarotRpc: {
      url: "http://127.0.0.1:3030",
      chainId: 1263227476,
      accounts: [
        process.env.ANVIL_PKEY_1!,
        process.env.ANVIL_PKEY_2!,
        process.env.ANVIL_PKEY_3!,
      ],
    },
    l1Rpc: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
      accounts: [
        process.env.ANVIL_PKEY_1!,
        process.env.ANVIL_PKEY_2!,
        process.env.ANVIL_PKEY_3!,
      ],
    },
  },
  defaultNetwork: "kakarotRpc",
  paths: {
    sources: "./solidity_contracts/src",
    tests: "./tests",
    cache: "./cache_hardhat",
    artifacts: "./artifacts",
  },
  ignition: {
    blockPollingInterval: 3_000,
    timeBeforeBumpingFees: 3 * 60 * 1_000,
    maxFeeBumps: 0,
    requiredConfirmations: 1,
  },
};
export default config;
