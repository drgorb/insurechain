/**
 * Main App Controller for the Angular Material Starter App
 * @param ObjectsDataService
 * @param $mdSidenav
 * @constructor
 */
function AppController(ObjectsDataService, contract, $mdSidenav, ipfsApi) {
  var self = this;

  self.selected     = null;
  self.users        = [ ];
  self.selectUser   = selectUser;
  self.toggleList   = toggleUsersList;

  // Load all registered users

  ObjectsDataService
        .loadAllObjects()
        .then( function( users ) {
          self.users    = [].concat(users);
          self.selected = users[0];
        });

  // *********************************
  // Internal methods
  // *********************************

  /**
   * Hide or Show the 'left' sideNav area
   */
  function toggleUsersList() {
    $mdSidenav('left').toggle();
  }

  /**
   * Select the current avatars
   * @param menuId
   */
  function selectUser ( user ) {
    self.selected = angular.isNumber(user) ? $scope.users[user] : user;
    contract.getInfo(self.selected.serial).then(function (info) {
      self.selected.isWarrantyValid = info.isWarrantyValid;
      self.selected.warrantyEndDate = info.warrantyEndDate;
      self.selected.customerId = info.customer;
      self.selected.price = info.price;
    })


  }
}

export default [ 'ObjectsDataService','EthereumService', '$mdSidenav', 'ipfsApi', AppController ];
