import * as types from '../../mutation-types'
import { getProducts, getWealth, getPoint, getTradeInfo } from '../../getters'
import { fetchProducts, fetchWealth, fetchPoint, fetchTradeInfo } from '../../actions'

const state = {
    products: [
        {
            id: 0,
            name: '--',
            decription: '--',
            assetType: 0,
            seventhYearYield: 0.0000,
            yieldPerMillion: 0.00,
            valueDate: '--',
            endDate: '--',
            uptTime: '--',
            valueDuration: null,
            endFlag:false
        }
    ],
    wealth: {
        orgNo: '',
        totalAsset: 0,
        nowdayIncome: 0,
        totalIncome: 0,
        orgTaAcctlist: [
            {
                orgNo: '',
                taAccountId: '',
                issueId: 0,
                issueBankId: '',
                investorName: '',
                taRegCerFileUrl: '',
                tradeAcco: '',
                taWealthAcctlist: [
                    {
                        taAccountId: '',
                        investorName: '',
                        totalIncome: 0,
                        nowdayIncome: 0,
                        totalAsset: 0,
                        availAsset: 0,
                        issueId: 0,
                        productId: '',
                        prodCode: '',
                        prodName: '',
                        productType: '',
                        uptTime: '',
                        seventhYearYield: 0,
                        yieldPerMillion: 0,
                        securityMarketType: 0
                    }
                ]
            }
        ]
    },
    point: {
        totalPoint: 0,
        availPoint: 0,
        frozePoint: 0,
        availDate: '--'
    },
    tradeInfo: {
        orgNo: '',
        telNo: '',
        idType: '',
        licenceNo: '',
        licenceExpireDate: '--',
        taxRegistrationNo: '',
        registrationFileUrl: '',
        organizationNo: '',
        orgNoFileUrl: '',
        bdTel: '',
        bdName: '',
        corpName: '',
        corpIdType: '',
        corpIdNo: '',
        corpIdFileUrl: '',
        corpIdExpireDate: '--',
        bankName: '',
        branchBankName: '',
        acctName: '',
        acctNo: ''
    }
};

const getters = {
    getProducts,
    getWealth,
    getPoint,
    getTradeInfo
};

const actions = {
    fetchProducts,
    fetchWealth,
    fetchPoint,
    fetchTradeInfo
};

const mutations = {
    [types.GET_PRODUCTS_SUCCESS] (state, products) {
        state.products = products
    },
    [types.GET_WEALTH_SUCCESS] (state, wealth) {
        state.wealth = wealth
    },
    [types.GET_POINT_SUCCESS] (state, point) {
        state.point = point
    },
    [types.GET_TRADEINFO_SUCCESS] (state, tradeInfo) {
        state.tradeInfo = tradeInfo
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}
