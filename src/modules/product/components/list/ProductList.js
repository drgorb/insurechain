// Notice that we do not have a controller since this component does not
// have any specialized logic.

export default {
  name : 'productList',
  config : {
    bindings         : {  users: '<', selected : '<', showDetails : '&onSelected' },
    template         : require('./ProductList.html')
  }
};
