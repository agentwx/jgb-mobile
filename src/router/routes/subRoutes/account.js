const account = {
    path: '/account',
    name: 'account',
    component:  (resolve) => require(['../../../views/account/index'], resolve),
    redirect: '/account/wealth',
    children: [
        {
            path: 'wealth',
            name: 'wealth',
            component:  (resolve) => require(['../../../views/account/wealth'], resolve)
        },
        {
            path: 'product',
            name: 'product',
            component:  (resolve) => require(['../../../views/account/product'], resolve)
        },
        {
            path: 'trade',
            name: 'trade',
            component:  (resolve) => require(['../../../views/account/trade'], resolve)
        },
        {
            path: 'point',
            name: 'point',
            component:  (resolve) => require(['../../../views/account/point'], resolve)
        },
        {
            path: 'system',
            name: 'system',
            component:  (resolve) => require(['../../../views/account/system'], resolve)
        }
    ],
    meta: {
        auth: true
    }
};

export default account;
