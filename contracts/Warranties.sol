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
    function kill() {
        if (msg.sender == owner) selfdestruct(owner);
    }
}

contract Warranties is mortal {
    enum Status {Requested, Accepted, Rejected, Terminated}

    struct PartnerRelations {
        Status status;
        uint sales /*the total amount of policies sold by retailer*/;
        uint payments /*the total amount paid by retailer*/;
    }

    struct Retailer {
        string companyName;
        mapping (address=>PartnerRelations) partnerRelations /*the mapping holds the relation of the partner with each insurance company*/;
    }

    mapping (address=>Retailer) retailers;

    event RetailerRequest(
        string indexed companyName,
        address retailerAddress,
        address indexed insurance
    );

    event StatusChanged(
        address indexed retailer;
        address indexed insurance;
        Status status;
    )

    /**
    the retailer send a transaction to request registration with an insurer
    */
    function requestRegistration(string companyName, address insurance) returns (bool){
        Retailer retailer = retailers[msg.sender];
        retailer.companyName = companyName;
        retailer.partnerRelations[insurance].status = Status.Requested;
        retailers[msg.sender] = retailer;
        RetailerRequest(companyName, msg.sender, insurance);
        return true;
    }

    /**
    sets the status of a retailer's request.
    only the insurance to which the request was made can do this
    */
    function setRequestState(address retailer, Status status) {
        retailers[retailer].partnerRelations[msg.sender].status = status;
        StatusChanged(retailer, msg.sender, status);
    }
    
}