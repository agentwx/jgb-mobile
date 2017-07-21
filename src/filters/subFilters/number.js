const number = {
    /**
     * 小数点转百分号
     * @param {number} value - 小数点
     * @returns {string}
     */
    toPercent (value) {
        let [newValue, digit] = ['', 4];
        (!isNaN(value) && value != null) ? newValue = (value * 100).toFixed(digit)  : newValue = (0).toFixed(digit) + '%';
        return newValue;
    },
    tonIteger (value) {
        let [newValue, digit] = ['', 0];
        (!isNaN(value) && value != null) ? newValue = (value * 100000000).toFixed(digit) : newValue = (0).toFixed(digit) ;
        return newValue;
    },
    /**
     * 小数点后保留固定位数
     * @param {number} value - 数字
     * @returns {string}
     */
    keepDecimal (value) {
        let [newValue, digit] = ['', 4];
        (!isNaN(value) && value != null) ? newValue = value.toFixed(digit) : newValue = (0).toFixed(digit);
        return newValue;
    },
    // 后几位数字
     numberLen (value) {
        let [newValue] = [''];
        ( value == null || value=='') ? newValue ='0000' : newValue = value.substr(-4) ;
        return newValue;
    },

    /**
     * 数字千分位保留两位小数点
     * @param {number} value - 数字
     * @returns {string}
     */
    formatMoney (value) {
        if (!isNaN(value) && value != null) {
            let num = parseFloat(value).toFixed(2);
            let regx = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
            return num.replace(regx, "$1,");
        } else {
            return '0.00';
        }
    },
    /**
     * 数字千分位
     * @param {number} value - 数字
     * @returns {string}
     */
    thousands (value) {
        if (!isNaN(value) && value != null) {
            let s = parseFloat((value + '').replace(/[^\d.-]/g, '')) + '';
            let l = s.split('.')[0].split('').reverse();
            let t = '';
            for(let i = 0; i < l.length; i ++ ) {
                t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
            }
            return t.split('').reverse().join('');
        } else {
            return '0';
        }
    }
};

export default number;
