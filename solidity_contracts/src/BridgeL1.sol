// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./kakarot/L1KakarotMessaging.sol";
import "./BridgeL2.sol";
import "./starknet/IStarknetMessaging.sol";
import "../lib/openzeppelin-contracts/contracts/interfaces/IERC20.sol";

// Define some custom error as an example.
// It saves a lot's of space to use those custom error instead of strings.
error InvalidPayload();

/// @title Test contract to receive / send messages to starknet.
/// @author Glihm https://github.com/glihm/starknet-messaging-dev
contract BridgeL1 {
    IStarknetMessaging private _starknetMessaging;
    IL1KakarotMessaging private _l1KakarotMessaging;
    IERC20 private _erc20;

    uint256 private _kakarotAddress;
    uint256 public receivedMessagesCounter;

    /// @notice Constructor.
    /// @param l1KakarotMessaging The address of the L1KakarotMessaging contract.
    /// @param kakarotAddress The Starknet address, on L2, of the Kakarot contract.
    constructor(address l1KakarotMessaging, uint256 kakarotAddress) {
        _l1KakarotMessaging = IL1KakarotMessaging(l1KakarotMessaging);
        _kakarotAddress = kakarotAddress;
    }

    /// @notice Initiates the bridging process
    /// @dev Must be called with a value sufficient to pay for the L1 message fee.
    /// @param l2BridgeAddress The address of the L2 contract to trigger.
    function bridgeToL2(
        address l2BridgeAddress,
        address l2ERC20Address,
        address l1ERC20Address,
        uint256 amount
    ) external payable {
        receivedMessagesCounter += 1;

        // escrow the tokens
        _erc20 = IERC20(l1ERC20Address);
        _erc20.transferFrom(msg.sender, address(this), amount);

        // sending mint message to L2
        _l1KakarotMessaging.sendMessageToL2{value: msg.value}(
            l2BridgeAddress,
            0,
            abi.encodeCall(
                BridgeL2.mintL2ERC20Tokens,
                (address(msg.sender), l2ERC20Address, amount)
            )
        );
    }

    function consumeBridgeToL1(bytes calldata payload) external {
        // Will revert if the message is not consumable.
        // Delegatecall to _l1KakarotMessaging
        (bool success, ) = address(_l1KakarotMessaging).delegatecall(
            abi.encodeWithSignature("consumeMessageFromL2(bytes)", payload)
        );
        require(success, "message consumption failed");

        // Decode the uint256 value from the payload
        // TODO: update this to mint tokens on L1
        uint256 value = abi.decode(payload, (uint256));
        receivedMessagesCounter += value;
    }
}
