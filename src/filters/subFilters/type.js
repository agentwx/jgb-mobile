const type = {
    /**
     * 市场类型
     * @param {string} value - 类型编号
     * @returns {string}
     */
    marketType (value) {
        let newValue = '';
        switch (value) {
            case '1':
                newValue = '场内';
                break;
            case '2':
                newValue = '场外';
                break;
            default:
                break;
        }
        return newValue;
    },
    /**
     * 企业证件类型
     * @param {string} value - 类型编码
     * @returns {string}
     */
    organCertType (value) {
        let newValue = '';
        switch (value) {
            case '0':
                newValue = '三证三码';
                break;
            case '1':
                newValue = '三证一码';
                break;
            default:
                break;
        }
        return newValue;
    },
    /**
     * 交易类型
     * @param {string} value - 类型编号
     * @returns {string}
     */
    tradeType (value) {
        let newValue = '';
        switch (value) {
            case '0':
                newValue = '申购';
                break;
            case '1':
                newValue = '赎回';
                break;
            default:
                break;
        }
        return newValue;
    },
    /**
     * 资产类型
     * @param {string} value - 类型编号
     * @returns {string}
     */
    assetType (value) {
        let newValue = '';
        switch (value) {
            case '0':
                newValue = '货币基金';
                break;
            case '1':
                newValue = '基金理财';
                break;
            default:
                break;
        }
        return newValue;
    },
    /**
     * 赎回类型
     * @param {string} value - 类型编号
     * @returns {string}
     */
    redeemType (value) {
        let newValue = '';
        switch (value) {
            case null:
                newValue = '实时到账';
                break;
            default:
                newValue = ' ';
                break;
        }
        return newValue;
    }
};

export default type;
