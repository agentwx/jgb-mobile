import Vue from 'vue'
import config from '../config'
import userService from '../services/userService'

// 事件总线
export const eventHub = new Vue();

/**
 * 时间转换
 * @param {number} date - 时间戳
 * @param {string} fmt - 格式
 * @returns {string}
 */
export const dateFormat = (date, fmt) => {
    if (!isNaN(date) && date != null) {
        let str = new Date(date);
        let obj = {
            'M+': str.getMonth() + 1,
            'd+': str.getDate(),
            'h+': str.getHours(),
            'm+': str.getMinutes(),
            's+': str.getSeconds(),
            'q+': Math.floor((str.getMonth() + 3) / 3),
            'S': str.getMilliseconds()
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (str.getFullYear() + '').substr(4 - RegExp.$1.length));
        for (let k in obj)
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (obj[k]) : (('00' + obj[k]).substr(('' + obj[k]).length)));
        return fmt;
    } else {
        return '';
    }
};

/**
 * 获取链接参数
 * @param {string} param - 参数名
 * @returns {any}
 */
export const getUrlParam = (param) => {
    let reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)"),
        r = window.location.search.substr(1).match(reg);
    if (r !== null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
};

/**
 * 去除字符串空格
 * @param {string} value - 字符串
 * @returns {*}
 */
export const stringTrim = (value) => {
    if (value) {
        return value.replace(/\s/g, '');
    } else {
        return value;
    }
};

/**
 * 本地存储管理
 */
export const storageManager = {
    getItem: (key, transfer) => {
        let value = '';
        transfer ? value = JSON.parse(window.localStorage.getItem(key)) : value = window.localStorage.getItem(key);
        return value;
    },
    setItem: (key, value) => {
        try {
            if (typeof(value) == 'object') {
                window.localStorage.setItem(key, JSON.stringify(value));
            } else {
                window.localStorage.setItem(key, value);
            }
        } catch (e) {
            alert('请关闭浏览器的隐身模式或无痕浏览！');
        }
    },
    removeItem: (key) => {
        if (key instanceof Array) {
            for (let i in key) {
                window.localStorage.removeItem(key[i]);
            }
        } else {
            window.localStorage.removeItem(key);
        }
    }
};

/**
 * Cookie管理
 */
export const cookieManager = {
    getItem: (key) => {
        if (document.cookie.length > 0) {
            let c_name = key;
            let c_start = document.cookie.indexOf(c_name + "=");
            if (c_start!=-1) {
                c_start = c_start + c_name.length + 1;
                let c_end = document.cookie.indexOf(";", c_start);
                if (c_end == -1) c_end = document.cookie.length;
                return document.cookie.substring(c_start, c_end);
            }
        }
        return '';
    },
    setItem: (key, value, expires) => {
        let exdate = new Date();
        let path = config.cookie.default.path;
        exdate.setDate(exdate.getDate() + expires);
        document.cookie = key + '=' + value + ';expires=' + exdate.toGMTString() + ';path=' + path;
    },
    removeItem: (key) => {
        let path = config.cookie.default.path;
        if (key instanceof Array) {
            for (let i in key) {
                document.cookie = key[i] + '= ;expires=-1' + ';path=' + path;
            }
        } else {
            document.cookie = key + '= ;expires=-1' + ';path=' + path;
        }
    }
};

/**
 * 错误码处理
 * @param {string} errCode - 错误码
 */
export const errorHandler = (errCode) => {
    switch (errCode) {
        case null: break;
        case '-1004':
            $.alert('会话已过期，请重新登陆', function () { userService.logout(); });break;
        case 'J0001':
            $.alert('该企业已注册');break;
        case 'J0002':
            $.alert('图片验证码不正确');break;
        case 'J0003':
            $.alert('短信验证码不正确');break;
        case 'J0004':
            $.alert('手机号已注册');break;
        case 'J0005':
            $.alert('短信发送太频繁');break;
        case 'J0006':
            $.alert('短信发送失败');break;
        case 'J0008':
            $.alert('用户名或密码为空');break;
        case 'J0009':
            $.alert('用户名或密码错误');break;
        case 'J0010':
            $.alert('手机号不存在');break;
        case 'J0012':
            $.alert('没有开户或者开户未成功');break;
        case 'J0013':
            $.alert('交易失败，系统内部错误');break;
        default:
            $.alert('未知错误，返回首页', function () { userService.logout(); });break;
    }
};

/**
 * 打印
 */
export const logger = {
    normal: (str) => {
        let time = '[' + dateFormat(new Date(), 'yyyy-MM-dd hh:ss') + ']';
        window.console.log(time + ' 系统日志：' + str);
    },
    info: (str) => {
        let time = '[' + dateFormat(new Date(), 'yyyy-MM-dd hh:ss') + ']';
        window.console.info(time + ' 系统消息：' + str);
    },
    warn: (str) => {
        let time = '[' + dateFormat(new Date(), 'yyyy-MM-dd hh:ss') + ']';
        window.console.warn(time + ' 系统警告：' + str);
    },
    error: (str) => {
        let time = '[' + dateFormat(new Date(), 'yyyy-MM-dd hh:ss') + ']';
        window.console.error(time + ' 系统错误：' + str);
    }
};
