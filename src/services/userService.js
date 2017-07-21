import config from '../config'
import { getUrlParam, errorHandler, storageManager, cookieManager, logger } from '../plugins/utils'

class UserService {
    login (payload) {
        return new Promise((resolve, reject) => {
            let [data, errCode, redirect, username, password, _self] = [
                '',
                '',
                getUrlParam('redirect'),
                payload.username,
                payload.password,
                payload.instance
            ];
            _self.$http.post(config.ajax._post.login, {
                telphone: username,
                passwd: password
            }).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (!errCode) {
                    switch (data.data.status) {
                        case 0:
                            _self.pageNo = 1;
                            break;
                        case 1:
                            resolve();
                            storageManager.setItem(config.session.loginKey, true);
                            storageManager.setItem(config.session.userKey, data.data);
                            cookieManager.setItem(config.cookie.userKey, username, 30);
                            _self.$router.push({ name: 'account' });
                            break;
                    }
                } else {
                    errorHandler(errCode);
                }
            }, (resp) => {
                logger.error('登陆失败，错误码[' + resp.status + ']');
            });
        })
    }
    logout () {
        return new Promise((resolve, reject) => {
            resolve();
            storageManager.removeItem([config.session.loginKey, config.session.userKey]);
            window.location.reload(true);
            // window.location.href = '/jgb-web/index';
        })
    }
    register (organName, realName, telphone, imageVerifiCode, telVerifiCode, passwd, vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.post(config.ajax._post.register, {
                organName: organName,
                realName: realName,
                telphone: telphone,
                imageVerifiCode: imageVerifiCode,
                telVerifiCode: telVerifiCode,
                passwd: passwd
            }).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (data.data) {
                    resolve();
                } else {
                    (errCode) ? errorHandler(errCode) : $.alert('注册失败');
                }
            }, (resp) => {
                logger.error('用户注册失败，错误码[' + resp.status + ']');
            });
        });
    }
    modifyPassword (oldPass, newPass, vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.post(config.ajax._post.changePwd, {
                oldPass: oldPass,
                passwd: newPass
            }).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (data.data) {
                    resolve()
                } else {
                    (errCode) ? errorHandler(errCode) : $.alert('密码修改失败');
                }
            }, (resp) => {
                logger.info('修改密码失败，错误码[' + resp.status + ']');
            })
        })
    }
    forgetPassword (telphone, imageVerifiCode, telVerifiCode, passwd, vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.post(config.ajax._post.forget, {
                telphone: telphone,
                imageVerifiCode: imageVerifiCode,
                telVerifiCode: telVerifiCode,
                passwd: passwd
            }).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (!errCode) {
                    resolve();
                } else {
                    errorHandler(errCode);
                }
            }, (resp) => {
                logger.error('修改密码失败，错误码[' + resp.status + ']');
            });
        });
    }
    feedback (orgName, content, vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.post(config.ajax._post.feedback, {
                orgName: orgName,
                content: content
            }).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (data.data) {
                    resolve();
                } else {
                    (errCode) ? errorHandler(errCode) : $.alert('反馈失败');
                }
            }, (resp) => {
                logger.error('反馈失败，错误码[' + resp.status + ']');
            });
        });
    }
}

export default new UserService();
