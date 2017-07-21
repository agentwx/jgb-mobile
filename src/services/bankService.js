import config from '../config'
import { errorHandler, logger } from '../plugins/utils'

class BankService {
    getBankInfo (vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.get(config.ajax._get.bankInfo).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (!errCode) {
                    (data.data) ? resolve(data.data) : reject();
                } else {
                    errorHandler(errCode);
                }
            }, (resp) => {
                logger.error('获取银行信息失败，错误码[' + resp.status + ']');
            });
        });

    }
}

export default new BankService();
