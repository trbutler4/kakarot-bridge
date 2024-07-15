// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "kakarot-lib/CairoLib.sol";

interface IERC20L2 {
    function mint(address account, uint256 amount) external;

    function burn(address account, uint256 amount) external;

    function transferFrom(address from, address to, uint256 amount) external;
}

contract BridgeL2 {
    IERC20L2 private _erc20L2;

    function burnAndMintL1ERC20Tokens(
        address l1BridgeAddress,
        address l2ERC20Address,
        uint256 amount
    ) external {
        _erc20L2 = IERC20L2(l2ERC20Address);
        _erc20L2.burn(address(msg.sender), amount);

        bytes memory payload = abi.encodeCall(
            IERC20L2.transferFrom,
            (l1BridgeAddress, address(msg.sender), amount)
        );

        CairoLib.sendMessageToL1(l1BridgeAddress, payload);
    }

    function mintL2ERC20Tokens(
        address recipient,
        address l2ERC20Address,
        uint256 amount
    ) external {
        _erc20L2 = IERC20L2(l2ERC20Address);
        _erc20L2.mint(recipient, amount);
    }
}
