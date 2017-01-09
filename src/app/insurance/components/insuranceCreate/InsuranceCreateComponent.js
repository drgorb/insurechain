/**
 * Created by Lukasz_Zygmanski on 03.01.2017.
 */
import insuranceCreateController from "./InsuranceCreateController";
export default {
    name: 'insuranceCreate',
    config: {
        template: require('./InsuranceCreateTemplate.html'),
        controller: insuranceCreateController
    }
}