/**
 * Created by Lukasz_Zygmanski on 03.01.2017.
 */

import HelloController from './HelloController'
export default {
    name: 'hello',
    config: {
        template: require('./HelloTemplate.html'),
        controller: HelloController
    }
}