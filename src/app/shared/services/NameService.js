/**
 * Created by Lukasz_Zygmanski on 23.12.2016.
 */

function NameService (
    $q,
    EthereumInsuranceService,
    EthereumRetailersService
) {

     this.getUserEntity = function(userRole, address) {
        switch(userRole) {
            case 1: return EthereumRetailersService.getRetailer(address);
            case 2: return EthereumInsuranceService.getInsurance(address);
            case 3 : return {
                name: 'owner'
            };
            default : return {};
        }
    };

    return this
}

export default [
    '$q',
    'EthereumInsuranceService',
    'EthereumRetailersService',
    NameService
];
