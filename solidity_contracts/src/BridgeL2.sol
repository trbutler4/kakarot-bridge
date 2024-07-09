// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "kakarot-lib/CairoLib.sol";
import "forge-std/IERC20.sol"

contract BridgeL2 {
    IERC20 private _exampleERC20L2;

    // @notice Sends a message to L1.
    // @dev Uses the Cairo Precompiles mechanism to invoke a the send_message_to_l1 syscall
    function increaseL1AppCounter(address to, uint128 value) external {
        bytes memory data = abi.encode(value);
        CairoLib.sendMessageToL1(to, data);
    }

    function mintERC20Tokens(
        address recipient,
        address l2ERC20Address,
        uint256 amount
    ) external {
        _exampleERC20L2 = IERC20(l2ERC20Address);
        _exampleERC20L2.mint(recipient, amount);
    }
}
