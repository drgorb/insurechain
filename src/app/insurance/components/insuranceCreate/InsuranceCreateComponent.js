/**
 * Created by Lukasz_Zygmanski on 03.01.2017.
 */

import insuranceCreateController from './insuranceCreateController'
export default {
    name: 'insuranceCreate',
    config: {
        template: require('./insuranceCreateTemplate.html'),
        controller: insuranceCreateController
    }
}