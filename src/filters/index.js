import common from './subFilters/common'
import name from './subFilters/name'
import number from './subFilters/number'
import type from './subFilters/type'

const filters = Object.assign(
    common,
    name,
    number,
    type
);

export default filters;
