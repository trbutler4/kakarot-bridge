// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

// NOTE: this is just a standard ERC20 contract. On L1, this is all
// that is needed, and we should support bridging for the most basic
// implementations.
contract ExampleERC20L1 is ERC20 {
    constructor(address fundingAccount) ERC20("ExampleERC20", "TEST") {
        _mint(fundingAccount, 1000000 * (10 ** 18));
    }
}
