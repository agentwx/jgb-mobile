import config from '../config'
import { errorHandler, logger } from '../plugins/utils'

class CommonService {
    sendSms (mobileNo, vue) {
        return new Promise((resolve, reject) => {
            let [data, errCode, _self] = ['', '', vue];
            _self.$http.post(config.ajax._post.sms, {
                mobile: mobileNo
            }, {
                emulateJSON: true
            }).then((resp) => {
                data = resp.body;
                errCode = data.errCode;
                if (!errCode) {
                    resolve()
                } else {
                    errorHandler(errCode);
                }
            }, (resp) => {
                logger.error('短信发送失败，错误码[' + resp.status + ']');
            })
        });
    }
}

export default new CommonService();
