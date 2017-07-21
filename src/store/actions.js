// 根文件，存放数据操作
import Vue from 'vue'
import * as types from './mutation-types'
import config from '../config'
import userService from '../services/userService'
import { logger, errorHandler } from '../plugins/utils'

/**
 * 获取产品列表
 * @param commit
 */
export const fetchProducts = ({ commit }) => {
    let [data, errCode] = ['', ''];
    Vue.http.get(config.ajax._get.products).then((resp) => {
        data = resp.body;
        errCode = data.errCode;
        if (!errCode) {
            commit('GET_PRODUCTS_SUCCESS', data.data);
        } else {
            errorHandler(errCode);
        }
    }, (resp) => {
        logger.error('获取产品列表失败，错误码[' + resp.status + ']');
    });
};

/**
 * 获取持有资产
 * @param commit
 */
export const fetchWealth = ({ commit }) => {
    let [data, errCode] = ['', ''];
    Vue.http.get(config.ajax._get.taAcctDetail).then((resp) => {
        data = resp.body;
        errCode = data.errCode;
        if (!errCode) {
            if (data.data) {
                commit('GET_WEALTH_SUCCESS', data.data);
            }
        } else {
            errorHandler(errCode);
        }
    }, (resp) => {
        logger.error('获取资产信息失败，错误码[' + resp.status + ']');
    });
};

/**
 * 获取积分
 * @param commit
 */
export const fetchPoint = ({ commit }) => {
    let [data, errCode] = ['', ''];
    Vue.http.get(config.ajax._get.point).then((resp) => {
        data = resp.body;
        errCode = data.errCode;
        if (!errCode) {
            if (data.data) {
                commit('GET_POINT_SUCCESS', data.data);
            }
        } else {
            errorHandler(errCode);
        }
    }, (resp) => {
        logger.error('获取企业积分失败，错误码[' + resp.status + ']');
    })
};

/**
 * 获取企业信息
 * @param commit
 */
export const fetchTradeInfo = ({ commit }) => {
    let [data, errCode] = ['', ''];
    Vue.http.get(config.ajax.tradeInfo).then((resp) => {
        data = resp.body;
        errCode = data.errCode;
        if (!errCode) {
            commit('GET_TRADEINFO_SUCCESS', data.data);
        } else {
            errorHandler(errCode);
        }
    }, (resp) => {
        logger.error('获取企业信息失败，错误码[' + resp.status + ']');
    });
};

/**
 * 用户登录
 * @param commit
 * @param payload
 */
export const userLogin = ({ commit }, payload) => {
    payload = payload || '';
    if (payload) {
        userService.login(payload).then(() => {
            commit(types.USER_LOGIN_SUCCESS)
        })
    } else {
        commit(types.USER_LOGIN_SUCCESS)
    }
};

/**
 * 用户退出
 * @param commit
 */
export const userLogout = ({ commit }) => {
    userService.logout().then(() => {
        commit(types.USER_LOGOUT_SUCCESS)
    })
};
