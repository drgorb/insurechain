pragma solidity ^0.4.4;

import "./Mortal.sol";
import './Retailers.sol';

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