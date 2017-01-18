
export default {
    name: 'mainLoader',
    config: {
        template: `
            <span class="info-progress">Contacting the blockchain ...</span>
            <md-progress-linear class="progress" md-mode="indeterminate"></md-progress-linear>
        `,
        controller: ['$rootScope', function ($rootScope) {
            $rootScope.showMainLoader = false;
        }]
    }
}
