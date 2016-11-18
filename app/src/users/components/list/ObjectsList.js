// Notice that we do not have a controller since this component does not
// have any specialized logic.

export default {
  name : 'objectsList',
  config : {
    bindings         : {  users: '<', selected : '<', showDetails : '&onSelected' },
    templateUrl      : 'src/users/components/list/ObjectList.html'
  }
};
