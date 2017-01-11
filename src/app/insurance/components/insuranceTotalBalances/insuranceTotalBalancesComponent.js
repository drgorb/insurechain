/**
 * Created by Lukasz_Zygmanski on 03.01.2017.
 */

import insuranceTotalBalancesController from './insuranceTotalBalancesController'
export default {
    name: 'insuranceTotalBalances',
    config: {
        template: require('./insuranceTotalBalancesTemplate.html'),
        controller: insuranceTotalBalancesController
    }
}