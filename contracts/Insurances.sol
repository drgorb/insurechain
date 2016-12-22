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

contract mortal is owned {
    enum Status {Requested, Accepted, Rejected, Terminated}

    function kill() {
        if (msg.sender == owner) selfdestruct(owner);
    }
}

contract Insurances is mortal {

    struct PartnerRelations {
        address retailer;
        Status status;
    }

    struct Insurance {
        string name;
        mapping (uint=>PartnerRelations) Retailers;

    }

}