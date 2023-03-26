pragma solidity ^0.8.7;

contract SendFunds {
    function sendTo(address payable _to) external payable {
        _to.transfer(msg.value);
    }
}