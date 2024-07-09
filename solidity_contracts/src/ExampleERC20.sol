// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract ExampleERC20 is ERC20, ERC20Burnable {
    constructor(address fundingAccount) ERC20("ExampleERC20", "TEST") {
        _mint(fundingAccount, 1000000 * (10 ** uint256(decimals())));
    }
}
