import config from '../config'
import { errorHandler, logger } from '../plugins/utils'

class ProductService {
    reser (productId, amount, issueId, txnType, taAccountId, modalType, vue) {
        let [data, errCode, successMsg, _self] = ['', '', '', vue];
        _self.$http.post(config.ajax._post.reser, {
            productId: productId,
            amount: amount,
            issueId: issueId,
            txnType: txnType,
            taAccountId: taAccountId
        }, {
            emulateJSON: true
        }).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (data.data) {
                switch (modalType) {
                    case 0:
                        successMsg = '预约申购成功';break;
                    case 1:
                        successMsg = '预约赎回成功';break;
                    case 2:
                        successMsg = '申购成功';break;
                    case 3:
                        successMsg = '赎回成功';break;
                }
                $.toast(successMsg);
            } else {
                (errCode) ? errorHandler(errCode) : $.alert('操作失败');
            }
        }, (resp) => {
            logger.error('操作失败，错误码[' + resp.status + ']');
        });
    }
    quickWithdraw (productId, amount, taAccountId, vue) {
        let [data, errCode, _self] = ['', '', vue];
        _self.$http.post(config.ajax._post.quickWithdraw, {
            productId: productId,
            amount: amount,
            taAccountId: taAccountId
        }, {
            emulateJSON: true
        }).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (data.data) {
                $.toast('赎回成功');
            } else {
                (errCode) ? errorHandler(errCode) : $.alert('赎回失败');
            }
        }, (resp) => {
            logger.error('赎回失败，错误码[' + resp.status + ']');
        });
    }
    getTotalAsset (productId, vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.get(config.ajax._get.totalAsset + '?productId=' + productId).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (!errCode) {
                    resolve(data.data);
                } else {
                    errorHandler(errCode);
                }
            }, (resp) => {
                logger.error('获取持有资产失败，错误码[' + resp.status + ']');
            })
        });
    }
    getTaInfo (issueId, vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.get(config.ajax._get.taInfo + '?issueId=' + issueId).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (!errCode) {
                    resolve(data.data);
                } else {
                    errorHandler(errCode);
                }
            }, (resp) => {
                logger.error('获取开户账号失败，错误码[' + resp.status + ']');
            });
        });
    }
    confirmAcct (payload, vue) {
        return new Promise((resolve, reject) => {
            let [url, data, errCode, _self] = ['', '', '', vue];
            (_self.isOTF) ? url = config.ajax._post.lofConfirmAcct : url = config.ajax._post.etfConfirmAcct;
            _self.$http.post(url, payload).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (data.data) {
                    resolve();
                } else {
                    reject(errCode);
                }
            }, (resp) => {
                logger.error('确权失败，错误码[' + resp.status + ']');
            })
        })
    }
            // 定期预约
    regular(parm, vue) {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.post(config.ajax._post.taSubscribe, parm, {
                emulateJSON: true
            }).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (data.data) {
                    $.alert('预约成功')
                } else {
                    $.alert('预约失败')
                }
            }, (resp) => {
                logger.error('预约失败，错误码[' + resp.status + ']');
            });
        }
        // 定期-预约 账户信息

    regularAccount(vue) {
        let [data, errCode, _self] = ['', '', vue];
        return new Promise((resolve, reject) => {
        _self.$http.get(config.ajax._get.allTaAcct).then((resp) => {
            data = resp.body;
            errCode = data.errCode;
            if (data.data) {
                    resolve(data.data);

                // window.layer.msg('获取账户成功', { time: 1300 });
            } else {
                (errCode) ? errorHandler(errCode): window.layer.msg('获取账户失败', { time: 1300 });
            }
        }, (resp) => {
            logger.error('获取账户失败，错误码[' + resp.status + ']');
        });
        })
    }
}

export default new ProductService();
