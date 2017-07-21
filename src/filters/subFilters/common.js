import { dateFormat } from '../../plugins/utils'

const common = {
    /**
     * 日期格式化
     * @param {number} value - 时间戳
     * @param {string} format - 时间格式
     * @returns {*}
     */
    formatDate (value, format) {
        return dateFormat(value, format);
    }
};

export default common;
