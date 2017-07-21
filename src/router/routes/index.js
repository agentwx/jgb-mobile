import common from './subRoutes/common'
import account from './subRoutes/account'

let routes = common;
routes.unshift(account);

export default routes;
