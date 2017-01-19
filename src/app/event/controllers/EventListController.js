function EventListController($scope, EthereumEventService) {
    EthereumEventService
        .getInsuranceStatusChanged()
        .then(events => {
            $scope.events = events;
        });
}

export default ['$scope', 'EthereumEventService', EventListController]