const common = [
    {
        path: '/index',
        name: 'index',
        component:  (resolve) => require(['../../../views/index'], resolve)
    },
    {
        path: '/forget',
        name: 'forget',
        component:  (resolve) => require(['../../../views/forget'], resolve)
    },
    {
        path: '/register',
        name: 'register',
        component:  (resolve) => require(['../../../views/register'], resolve)
    },
    { path: '/', redirect: '/index' }
];

export default common;
