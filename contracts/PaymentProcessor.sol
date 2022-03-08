// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract PaymentProcessor{
    address public admin;
    IERC20 public dai;

    event PaymentDone(address sender, uint amount, uint paymentId, uint time);

    constructor(address _adminAddress, address _daiAddress ){
        admin = _adminAddress;
        dai = IERC20(_daiAddress);

    }

    function pay( uint amount, uint paymentId) public{
        dai.transferFrom(msg.sender, admin, amount);
        emit PaymentDone(msg.sender, amount, paymentId, block.timestamp);
    }
}