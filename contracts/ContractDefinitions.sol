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

contract PriceCalculator {
    function getWarrantyPrice(string productId, uint startDate, uint endDate, uint productPrice) constant returns (uint) {
        uint yrs = (endDate - startDate) / 1 years;
        /*the price is allways 5% per year*/
        return productPrice * yrs / 20;
    }
}

contract stateful {
    enum RetailerStatus {Undefined, Requested, Accepted, Rejected, Terminated}
    enum InsuranceStatus {Undefined, Requested, Active, Terminated}
    enum WarrantyStatus {Undefined, Created, Confirmed, Canceled}
    enum UserRole {Undefined, Retailer, Insurance, Owner}
}

contract related is stateful{
    struct PartnerRelations {
        RetailerStatus status;
        uint sales /*the total amount of policies sold by retailer*/;
        uint payments /*the total amount paid by retailer*/;
        uint claims /*the total amount the insurance has paid to the retailer in claims*/;
    }
}

contract InsuranceManager is owned, related {
    struct Insurance {
        string name;
        InsuranceStatus status;
        PriceCalculator priceCalculator;
        mapping (address=>PartnerRelations) retailers;
    }

    mapping (address => Insurance) insurances;
    mapping (uint=>address) insuranceList;
    uint public insuranceCount;

    event InsuranceStatusChanged(
        address indexed insurance,
        InsuranceStatus status
    );

    function isInsurance(address insurance) constant returns (bool) {
        return insurances[insurance].status != InsuranceStatus.Undefined;
    }

    function createInsurance(string name, address priceCalculator) {
        Insurance insurance = insurances[msg.sender];
        InsuranceStatus previousStatus = insurance.status;
        insurance.status = InsuranceStatus.Requested;
        if(previousStatus != InsuranceStatus.Undefined) throw;

        insurance.name = name;
        insurance.priceCalculator = PriceCalculator(priceCalculator);
        insuranceList[insuranceCount++] = msg.sender;

        InsuranceStatusChanged(msg.sender, InsuranceStatus.Requested);
    }

    function setInsuranceState(address insuranceAddress, InsuranceStatus status) ownerOnly {
        Insurance insurance = insurances[insuranceAddress];
        if(insurance.status == InsuranceStatus.Undefined) throw;

        insurance.status = status;
    }

    function getInsurance(uint index) constant returns (string name, address, InsuranceStatus) {
        Insurance insurance = insurances[insuranceList[index]];
        return (insurance.name, insuranceList[index], insurance.status);
    }

    function getInsuranceStatus(address insuranceAddress) constant returns (InsuranceStatus) {
        return insurances[insuranceAddress].status;
    }

    function getWarrantyPrice(address insuranceAddress, string productId, uint startDate, uint endDate, uint productPrice) constant returns (uint) {
        Insurance insurance = insurances[insuranceAddress];
        if(insurance.status != InsuranceStatus.Active) throw;
        return insurance.priceCalculator.getWarrantyPrice(productId, startDate, endDate, productPrice);
    }

    function increaseSalesBalance(address insurance, address retailer, uint amount) {
        insurances[insurance].retailers[retailer].sales += amount;
    }

    function decreaseSalesBalance(address insurance, address retailer, uint amount) {
        insurances[insurance].retailers[retailer].sales -= amount;
    }

    function increasePaymentsBalance(address insurance, address retailer, uint amount) {
        insurances[insurance].retailers[retailer].payments += amount;
    }

    function decreasePaymentsBalance(address insurance, address retailer, uint amount) {
        insurances[insurance].retailers[retailer].payments -= amount;
    }

    function increaseClaimsBalance(address insurance, address retailer, uint amount) {
        insurances[insurance].retailers[retailer].claims += amount;
    }

    function decreaseClaimsBalance(address insurance, address retailer, uint amount) {
        insurances[insurance].retailers[retailer].claims -= amount;
    }
}

contract RetailerManager is owned, related {
    InsuranceManager insuranceManager;

    function RetailerManager(address _insuranceManager){
        insuranceManager = InsuranceManager(_insuranceManager);
    }

    function setSubContractAddresses (address _insuranceManager) ownerOnly {
        insuranceManager = InsuranceManager(_insuranceManager);
    }

    modifier insuranceOnly {
        if(!isInsurance(msg.sender)) throw;
        _;
    }

    function isInsurance(address insurance) constant returns (bool) {
        return insuranceManager.getInsuranceStatus(insurance) != InsuranceStatus.Undefined;
    }

    struct Retailer {
        string companyName;
        mapping (address=>PartnerRelations) partnerRelations /*the mapping holds the relation of the partner with each insurance company*/;
        RetailerStatus status/*in order to easily check for the existence of a retailer the first status is also set on the retailer itself*/;
    }

    mapping (address=>Retailer) retailers;
    mapping (uint=>address) retailerList;
    uint public retailerCount;

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

    /**
    the retailer send a transaction to request registration with an insurer
    */
    function requestRegistration(string companyName, address insurance) {
        Retailer retailer = retailers[msg.sender];
        retailer.companyName = companyName;
        /*make sure the insurance company exists*/
        if(insuranceManager.getInsuranceStatus(insurance) != InsuranceStatus.Active) {
            throw;
        }
        /*make sure no previous request was made*/
        if(retailer.partnerRelations[insurance].status != RetailerStatus.Undefined){
            throw;
        }

        retailerList[retailerCount++] = msg.sender;
        retailer.partnerRelations[insurance].status = RetailerStatus.Requested;
        retailer.status = RetailerStatus.Accepted;
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

    function getRetailerStatus(address retailer, address insurance) returns (RetailerStatus){
        return retailers[retailer].partnerRelations[insurance].status;
    }

    function getRetailerStatus(address retailer) returns (RetailerStatus){
        return retailers[retailer].status;
    }

    /**
    get the nth retailer in the list
    */
    function getRetailer(uint index, address insuranceAddress) constant returns (address, string, RetailerStatus, RetailerStatus) {
        address retailerAddress = retailerList[index];
        Retailer retailer = retailers[retailerAddress];
        return (retailerAddress, retailer.companyName, retailer.status, retailer.partnerRelations[insuranceAddress].status);
    }

    function getRetailerByAddress(address retailerAddress, address insuranceAddress) constant returns (address, string, RetailerStatus, RetailerStatus) {
        Retailer retailer = retailers[retailerAddress];
        return (retailerAddress, retailer.companyName, retailer.status, retailer.partnerRelations[insuranceAddress].status);
    }

    function getRetailerBalances(address retailer, address insurance) constant returns (uint, uint, uint) {
        PartnerRelations partnerRelation = retailers[retailer].partnerRelations[insurance];
        return (partnerRelation.sales, partnerRelation.payments, partnerRelation.claims);
    }

    function increaseSalesBalance(address retailer, address insurance, uint price) {
        retailers[retailer].partnerRelations[insurance].sales += price;
    }

    function decreaseSalesBalance(address retailer, address insurance, uint price) {
        retailers[retailer].partnerRelations[insurance].sales -= price;
    }

    function increasePaymentsBalance(address retailer, address insurance, uint amount) {
        retailers[retailer].partnerRelations[insurance].payments += amount;
    }

    function decreasePaymentsBalance(address retailer, address insurance, uint amount) {
        retailers[retailer].partnerRelations[insurance].payments -= amount;
    }

    function increaseClaimsBalance(address retailer, address insurance, uint amount) {
        retailers[retailer].partnerRelations[insurance].claims += amount;
    }

    function decreaseClaimsBalance(address retailer, address insurance, uint amount) {
        retailers[retailer].partnerRelations[insurance].claims -= amount;
    }
}

contract Insurechain is mortal, stateful{
    InsuranceManager insuranceManager;
    RetailerManager retailerManager;

    function Insurechain(address _insuranceManager, address _retailerManager) {
        insuranceManager = InsuranceManager(_insuranceManager);
        retailerManager = RetailerManager(_retailerManager);
    }

    function setSubContractAddresses (address _insuranceManager, address _retailerManager) ownerOnly {
        insuranceManager = InsuranceManager(_insuranceManager);
        retailerManager = RetailerManager(_retailerManager);
    }

    struct Claim {
        address retailer /*in theory another retailer than the one who sold the insurance can make a claim*/;
        uint amount;
        string description;
    }

    struct Warranty {
        address retailer;
        uint startDate;
        uint endDate;
        string policyNumber;
        WarrantyStatus status;
        uint productPrice;
        uint warrantyPrice;
        mapping (uint => Claim) claims;
        uint claimCount;
    }

    // mapping of insurance -> productId -> serialNumber -> Warranty
    mapping (address=>mapping( string=>mapping( string=>Warranty ))) warranties;

    modifier insuranceOnly {
        if(!isInsurance(msg.sender)) throw;
        _;
    }

    function isInsurance(address insurance) constant returns (bool) {
        return insuranceManager.getInsuranceStatus(insurance) != InsuranceStatus.Undefined;
    }

    modifier registeredRetailerOnly(address insurance) {
        if(!isRegisteredRetailer(insurance, msg.sender)) throw;
        _;
    }

    function isRegisteredRetailer(address insurance, address retailer) constant returns (bool) {
        return isInsurance(insurance) && retailerManager.getRequestState(retailer, insurance) == RetailerStatus.Accepted;
    }

    function getRole(address user) constant returns (UserRole) {
        if(user == owner) return UserRole.Owner;
        if(retailerManager.getRetailerStatus(user) == RetailerStatus.Accepted) return UserRole.Retailer;
        if(insuranceManager.getInsuranceStatus(user) == InsuranceStatus.Active) return UserRole.Insurance;

        return UserRole.Undefined;
    }

    function getWarrantyQuote(string productId, address insurance, uint startDate, uint endDate, uint productPrice) 
                              constant returns(uint warrantyPrice) {
        return insuranceManager.getWarrantyPrice(insurance, productId, startDate, endDate, productPrice);
    }

    /**
        Creates a new warranty.
        productId: The EAN13 that identifies the product
        serialNumber: the particular product serial number
        insurance: the eth address of the insurance
        startDate: start date of the extended warranty
        endDate: start date of the extended warranty
        price: the price in cents
    */
    function createWarranty(string productId, string serialNumber, address insurance, uint startDate, uint endDate, uint productPrice) registeredRetailerOnly(insurance) {
        Warranty warranty = warranties[insurance][productId][serialNumber];
        if(warranty.status != WarrantyStatus.Undefined) throw;

        warranty.status = WarrantyStatus.Created;
        warranty.startDate = startDate;
        warranty.endDate = endDate;
        warranty.productPrice = productPrice;
        warranty.retailer = msg.sender;
        warranty.warrantyPrice = insuranceManager.getWarrantyPrice(insurance, productId, startDate, endDate, productPrice);
        retailerManager.increaseSalesBalance(msg.sender, insurance, warranty.warrantyPrice);
        insuranceManager.increaseSalesBalance(insurance, msg.sender, warranty.warrantyPrice);
    }

    /**
        Confirms a warranty
        productId: The EAN13 that identifies the product
        serialNumber: the particular product serial number
        policyNumber: the policy number of the warranty
    */
    function confirmWarranty(string productId, string serialNumber, string policyNumber) insuranceOnly {
        Warranty warranty = warranties[msg.sender][productId][serialNumber];
        if(warranty.status != WarrantyStatus.Created) throw;

        warranty.status = WarrantyStatus.Confirmed;
        warranty.policyNumber = policyNumber;
    }

    /**
        Cacnels a warranty
        productId: The EAN13 that identifies the product
        serialNumber: the particular product serial number
        policyNumber: the policy number of the warranty
    */
    function cancelWarranty(string productId, string serialNumber, address insuranceAddress) registeredRetailerOnly(insuranceAddress) {
        Warranty warranty = warranties[insuranceAddress][productId][serialNumber];
        /*a warranty can only be canceled if it exists and no claims have been made*/
        if(warranty.status == WarrantyStatus.Undefined || warranty.claimCount > 0) throw;

        warranty.status = WarrantyStatus.Canceled;
        retailerManager.decreaseSalesBalance(msg.sender, insuranceAddress, warranty.warrantyPrice);
        insuranceManager.decreaseSalesBalance(insuranceAddress, msg.sender, warranty.warrantyPrice);
    }

    function getWarranty(string productId, string serialNumber, address insurance) constant returns (uint startDate, uint endDate, WarrantyStatus status, 
                         string policyNumber, uint warrantyPrice, uint claimCount) {
        Warranty warranty = warranties[insurance][productId][serialNumber];
        return (warranty.startDate, warranty.endDate, warranty.status, warranty.policyNumber, warranty.warrantyPrice, warranty.claimCount);
    }

    /**
        create a new claim for an insured product
        productId: The EAN13 that identifies the product
        serialNumber: the particular product serial number
    */
    function createClaim(string productId, string serialNumber, address insurance, uint amount, string description) registeredRetailerOnly(insurance) {
        Warranty warranty = warranties[insurance][productId][serialNumber];
        /*create only works for existing and valid warranties*/
        if(warranty.status != WarrantyStatus.Confirmed || warranty.startDate > now || warranty.endDate < now) throw;

        Claim claim = warranty.claims[warranty.claimCount++];
        claim.retailer = msg.sender;
        claim.amount = amount;
        claim.description = description;

        /*increase the retailer's account*/
        retailerManager.increaseClaimsBalance(msg.sender, insurance, amount);
        insuranceManager.increaseClaimsBalance(insurance, msg.sender, amount);
    }

    function getClaim(string productId, string serialNumber, address insurance, uint idx) constant returns (address retailer, uint amount, string description) {
        Claim claim = warranties[insurance][productId][serialNumber].claims[idx];
        return (claim.retailer, claim.amount, claim.description);
    }
}
