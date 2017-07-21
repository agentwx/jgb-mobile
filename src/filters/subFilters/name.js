const name = {
    /**
     * 产品名称处理
     * @param {string} value - 产品名称
     * @param {string} type - 截取类型
     * @returns {string}
     */
    formatProdName (value, type) {
        let newValue = '';
        switch (type) {
            case '0':
                newValue = value.substring(0, value.indexOf('（'));
                break;
            case '1':
                newValue = value.substring(value.indexOf('（'));
                break;
            default:
                break;
        }
        return newValue;
    }
};

export default name;
