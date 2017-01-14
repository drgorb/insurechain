/**
 * Created by Lukasz_Zygmanski on 03.01.2017.
 */

import InsuranceBalancesController from './InsuranceBalancesController'
export default {
    name: 'insuranceBalances',
    config: {
        template: require('./InsuranceBalancesTemplate.html'),
        controller: InsuranceBalancesController
    }
}