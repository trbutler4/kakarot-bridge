// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.0.0
pragma solidity ^0.8.20;

import "../lib/openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";
import "../lib/openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "../lib/openzeppelin-contracts/contracts/access/Ownable.sol";

contract ExampleERC20L2 is ERC20, ERC20Burnable, Ownable {
    constructor(
        address l2BridgeAddress
    ) ERC20("ExampleERC20", "TEST") Ownable(l2BridgeAddress) {}

    // NOTE: this should only be callable by the L2 bridge contract
    function mint(address account, uint256 amount) public onlyOwner {
        _mint(account, amount);
    }

    // NOTE: this should only be callable by the L2 bridge contract
    function burn(address account, uint256 amount) public onlyOwner {
        _burn(account, amount);
    }
}
