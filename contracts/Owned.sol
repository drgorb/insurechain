pragma solidity ^0.4.4;

contract owned {
    address owner;

    modifier ownerOnly() {
        if (msg.sender == owner) _;
        throw;
    }

    function Owned() {
        owner = msg.sender;
    }
}
