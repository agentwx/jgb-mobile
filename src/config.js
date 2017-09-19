const basePath = '/jgb-web/v1/';

export default {
    session: {
        loginKey: 'jgb_logged',
        userKey: 'jgb_userInfo'
    },
    cookie: {
        default: {
            path: '/jgb-web/'
        },
        userKey: 'UUID'
    },
    ajax: {
        tradeInfo: basePath + 'organ/tradeInfo',
        _get: {
            products: basePath + 'products',
            wealth: basePath + 'wealth',
            totalAsset: basePath + 'wealth/totalAssert',
            taAcctDetail: basePath + 'wealth/taAcctDetail',
            remain:basePath+"products/remain",
            points: basePath + 'points',
            point: basePath + 'points/point',
            recommend: basePath + 'products/rec',
            tradeList: basePath + 'tradelist',
            income: basePath + 'wealth/income',
            bankInfo: basePath + 'organ/bankInfo',
            taInfo: basePath + 'organ/taInfo',
            allTaAcct: basePath + 'organ/allTaAcct',
        },
        _post: {
            uploadImg: basePath + 'file',
            login: basePath + 'organ/login',
            register: basePath + 'organ/reg',
            forget: basePath + 'organ/pass',
            sms: basePath + 'sms',
            account: basePath + 'organ/tradeInfo',
            reser: basePath + 'products/reser',
            quickWithdraw: basePath + 'products/quickWithdraw',
            changePwd: basePath + 'organ/modifyPass',
            feedback: basePath + 'organ/feedBack',
            openAcct: basePath + 'organ/openAcct',
            lofConfirmAcct: basePath + 'organ/lofConfirmAcct',
            etfConfirmAcct: basePath + 'organ/etfConfirmAcct',
            taSubscribe: basePath + 'organ/taSubscribe',
            totalAsset: basePath + 'wealth/totalAssert'
            
            
        }
    }
}
