/**
 * Created by Lukasz_Zygmanski on 19.01.2017.
 */
export default [
    {
        link : 'app.home',
        title: 'Home',
        icon: 'dashboard',
        permissionRoles: ['UNDEFINED', 'RETAILER', 'INSURANCE', 'OWNER']
    },
    {
        link : 'app.insurance',
        title: 'Insurance',
        icon: 'dashboard',
        permissionRoles: ['OWNER']
    },
    {
        link : 'app.retailer',
        title: 'Retailer',
        icon: 'dashboard',
        permissionRoles: ['INSURANCE']
    },
    {
        link : 'app.warranty',
        title: 'Warranty',
        icon: 'dashboard',
        permissionRoles: ['UNDEFINED', 'RETAILER', 'INSURANCE', 'OWNER']
    }
];