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

contract Insurechain is mortal {
    enum RetailerStatus {Undefined, Requested, Accepted, Rejected, Terminated}
    enum InsuranceStatus {Undefined, Active, Terminated}

    struct PartnerRelations {
        RetailerStatus status;
        uint sales /*the total amount of policies sold by retailer*/;
        uint payments /*the total amount paid by retailer*/;
    }

    struct Insurance {
        string name;
        InsuranceStatus status;
    }

    struct Retailer {
        string companyName;
        mapping (address=>PartnerRelations) partnerRelations /*the mapping holds the relation of the partner with each insurance company*/;
    }

    mapping (address=>Retailer) retailers;
    mapping (address => Insurance) insurances;

    event RetailerRequest(
        string indexed companyName,
        address retailerAddress,
        address indexed insurance
    );

    event RetailerStatusChanged(
        address indexed retailer,
        address indexed insurance,
        RetailerStatus status
    );

    event InsuranceStatusChanged(
        address indexed insurance,
        InsuranceStatus status
    );

    modifier insuranceOnly {
        if(insurances[msg.sender] == InsuranceStatus.Undefined) throw;
        _;
    }

    modifier registeredRetailerOnly(address insurance) {
        if(retailers[msg.sender].partnerRelations[insurance] != RetailerStatus.Accepted) throw;
        _;
    }

    function createInsurance(string name, address insuranceAddress) {
        Insurance insurance = insurances[insuranceAddress];
        if(insurance.status != InsuranceStatus.Undefined) throw;

        insurance.status = InsuranceStatus.Active;

        InsuranceStatusChanged(insuranceAddress, InsuranceStatus.Active);
    }

    /**
    the retailer send a transaction to request registration with an insurer
    */
    function requestRegistration(string companyName, address insurance) {
        Retailer retailer = retailers[msg.sender];
        retailer.companyName = companyName;
        retailer.partnerRelations[insurance].status = RetailerStatus.Requested;
        retailers[msg.sender] = retailer;
        RetailerRequest(companyName, msg.sender, insurance);
    }

    function getRequestState(address retailer, address insurance) constant returns (RetailerStatus) {
        return retailers[retailer].partnerRelations[insurance].status;
    }

    /**
    sets the status of a retailer's request.
    only the insurance to which the request was made can do this
    */
    function setRequestState(address retailer, RetailerStatus status) insuranceOnly {
        retailers[retailer].partnerRelations[msg.sender].status = status;
        RetailerStatusChanged(retailer, msg.sender, status);
    }

}
