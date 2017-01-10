/**
 * Created by Lukasz_Zygmanski on 03.01.2017.
 */

import insuranceBalancesController from './insuranceBalancesController'
export default {
    name: 'insuranceBalances',
    config: {
        template: require('./insuranceBalancesTemplate.html'),
        controller: insuranceBalancesController
    }
}