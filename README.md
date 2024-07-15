# Build On Kakarot

## Description

An example repository to demonstrate how to build on Kakarot.

## Requirements

- [Docker](https://docs.docker.com/get-docker/)
- [Yarn](https://classic.yarnpkg.com/lang/en/docs/install)
- [Foundry](https://book.getfoundry.sh/getting-started/installation)
- [Scarb](https://docs.swmansion.com/scarb/download.html#install-via-asdf) and [Starkli](https://github.com/xJonathanLEI/starkli) if you want to deploy Cairo contracts. Make sure to install starkli version `0.2.9` with `starkliup -v  v0.2.9`

## Setting up

Run the following command to setup the git submodules.

```
make setup
```

Copy example.env into .env and add relevant variables
```
cp .env.example .env
```

To get started, you will need to run the local nodes. You can do this by running:

```sh
make start
```

This will start an Anvil Node (that runs the L1 contracts for L1 <> L2 messaging) at address `http://127.0.0.1:8545` and a Kakarot Node at address `http://127.0.0.1:3030`

Kakarot is deployed along with commonly used contracts, such as [Multicall3](https://github.com/mds1/multicall/blob/main/src/Multicall3.sol), [CreateX](https://github.com/pcaversaccio/createx?tab=readme-ov-file#permissioned-deploy-protection-and-cross-chain-redeploy-protection) and the [Arachnid Proxy](https://github.com/Arachnid/deterministic-deployment-proxy).

## Deploying the L1 contracts

To deploy the L1 contracts, you can run:

```sh
make deploy-l1
```

This will deploy the L1 messaging contracts on the Anvil node. As well as the L1 bridge contract, and L1 ERC20 contract.

## Deploying L2 contracts

The L2 contracts will de deployed with forge.

1. Deploy L2 bridge contract.

```
make deploy-bridge-l2-forge
```

2. Run script to update UI with deployed contract.

```
node scripts/update_bridge_l2_data.js <DEPLOYED CONTRACT ADDRESS>
```

3. Deploy L2 ERC20 contract.

```
make deploy-erc20-l2-forge
```

4. Run script to update UI with deployed contract.

```
node scripts/update_erc20_l2_data.js <DEPLOYED CONTRACT ADDRESS>
```

### Running the UI

1. navigate to "ui" directory and install dependencies

```
cd ui && yarn
```

2. Run development server
```
yarn dev
```


### Run tests

To run the hardhat test suite, you can run:

```sh
make test
```
