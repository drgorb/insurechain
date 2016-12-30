pragma solidity ^0.4.4;

contract owned {
    address owner;

    modifier ownerOnly() {
        if (msg.sender != owner) throw;
        _;
    }

    function owned() {
        owner = msg.sender;
    }

    function getOwner() constant returns (address) {
        return owner;
    }
}

contract mortal is owned {
    function kill() {
        if (msg.sender == owner) selfdestruct(owner);
    }
}

contract Insurechain is mortal {
    enum RetailerStatus {Undefined, Requested, Accepted, Rejected, Terminated}
    enum InsuranceStatus {Undefined, Requested, Active, Terminated}
    enum UserRole {Undefined, Retailer, Insurance, Owner}

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
        RetailerStatus status/*in order to easily check for the existence of a retailer the first status is also set on the retailer itself*/;
    }

    mapping (address=>Retailer) retailers;
    mapping (uint=>address) retailerList;
    uint public retailerCount;

    mapping (address => Insurance) insurances;
    mapping (uint=>address) insuranceList;
    uint public insuranceCount;

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
        if(insurances[msg.sender].status == InsuranceStatus.Undefined) throw;
        _;
    }

    modifier registeredRetailerOnly(address insurance) {
        if(retailers[msg.sender].partnerRelations[insurance].status != RetailerStatus.Accepted) throw;
        _;
    }

    function createInsurance(string name) {
        Insurance insurance = insurances[msg.sender];
        if(insurance.status != InsuranceStatus.Undefined) throw;

        insurance.status = InsuranceStatus.Requested;
        insurance.name = name;
        insuranceList[insuranceCount++] = msg.sender;

        InsuranceStatusChanged(msg.sender, InsuranceStatus.Requested);
    }


    function setInsuranceState(address insuranceAddress, InsuranceStatus status) ownerOnly {
        Insurance insurance = insurances[insuranceAddress];
        if(insurance.status == InsuranceStatus.Undefined) throw;

        insurance.status = status;
    }

    function getInsurance(uint index) constant returns (string, address, InsuranceStatus) {
        Insurance insurance = insurances[insuranceList[index]];
        return (insurance.name, insuranceList[index], insurance.status);
    }

    /**
    the retailer send a transaction to request registration with an insurer
    */
    function requestRegistration(string companyName, address insurance) {
        Retailer retailer = retailers[msg.sender];
        retailer.companyName = companyName;
        /*make sure the insurance company exists*/
        if(insurances[insurance].status != InsuranceStatus.Active) {
            throw;
        }
        /*make sure no previous request was made*/
        if(retailer.partnerRelations[insurance].status != RetailerStatus.Undefined){
            throw;
        }

        retailerList[retailerCount++] = msg.sender;
        retailer.partnerRelations[insurance].status = RetailerStatus.Requested;
        retailer.status = RetailerStatus.Requested;
        retailers[msg.sender] = retailer;
        //RetailerRequest(companyName, msg.sender, insurance);
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

    /**
    get the nth retailer in the list
    */
    function getRetailer(uint index) constant returns (address, string) {
        return (retailerList[index], retailers[retailerList[index]].companyName);
    }

    function getRole(address user) constant returns (UserRole) {
        if(user == owner) return UserRole.Owner;
        if(retailers[user].status != RetailerStatus.Undefined) return UserRole.Retailer;
        if(insurances[user].status != InsuranceStatus.Undefined) return UserRole.Insurance;

        return UserRole.Undefined;        
    }


}
