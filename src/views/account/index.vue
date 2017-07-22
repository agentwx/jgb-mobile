<template>
    <div id="account">
        <transition name="router">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </transition>
        <div class="tab">
            <router-link :to="{ name: 'wealth' }" tag="div" class="item wealth">
                <div class="icon"></div>
                <div class="text">
                    <span>我的资产</span>
                </div>
            </router-link>
            <router-link :to="{ name: 'product' }" tag="div" class="item product">
                <div class="icon"></div>
                <div class="text">
                    <span>产品列表</span>
                </div>
            </router-link>
            <router-link :to="{ name: 'trade' }" tag="div" class="item trade">
                <div class="icon"></div>
                <div class="text">
                    <span>交易记录</span>
                </div>
            </router-link>
            <router-link :to="{ name: 'point' }" tag="div" class="item point">
                <div class="icon"></div>
                <div class="text">
                    <span>爱心值</span>
                </div>
            </router-link>
            <router-link :to="{ name: 'system' }" tag="div" class="item system">
                <div class="icon"></div>
                <div class="text">
                    <span>系统管理</span>
                </div>
            </router-link>
        </div>
        <c-modal v-if="showBuy">
            <div class="buy modal-container" slot="modal-container">
                <div class="title">
                    <span>申购</span>
                    <a class="btn" @click="closeModal(2)">
                        <img src="../../assets/images/account/index/modal-close.png">
                    </a>
                </div>
                <div class="triangle"></div>
                <div class="content">
                    <div class="row">
                        <span>选择产品：</span>
                        <span class="select active" @click="selectProduct($event)">{{ product.name }}</span>
                    </div>
                    <div class="row">
                        <span>选择账户：</span>
                        <select id="acct-id" v-model="selected">
                            <option v-for="item in taInfo" :value="item.acctId">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="row">
                        <span>申购金额：</span>
                        <input v-if='isQDZ' id="money" type="tel" placeholder="单日限额2000万元" v-model="moneyThousands">
                        <input v-else-if='isQDZA' id="money" class="money1" type="tel" placeholder="500万(含)以上请申购广发货币B" v-model="moneyThousands">
                        <input v-else id="money" type="tel" placeholder="500万起投" v-model="moneyThousands">
                        <span>（元）</span>
                    </div>
                </div>
                <div class="title">
                    <span>汇款</span>
                </div>
                <div class="triangle"></div>
                <div class="comment">
                    <div class="detail">
                        <template v-for="item in taInfo"><span v-if="selected==item.acctId">请以贵公司开户银行({{ item.bankName }}尾号{{ item.bankAcctNo | numberLen }}），将预约资金汇入以下银行账户</span></template>
                        <!-- <span>请以贵公司开户银行（{{ bankInfo.bankName }}尾号{{ bankInfo.shortAcctNo.substr(-4) }}），将预约资金汇入以下银行账户</span> -->
                        <div class="bank-info">
                            <span>银行户名：广发基金管理有限公司直销账户</span>
                            <span>银行账号：3602 0001 2983 8383 823</span>
                            <span>开户行：中国工商银行广州第一支行</span>
                        </div>
                        <span>注:1.当日15：00前完成汇款，次日计息；<em>15：00之后汇款，当{{product.carryForwardType}}日交易失败。</em></span>
                        <template v-if='product.carryForwardType==1'>
                            <span>2.根据基金合同，广发货币<template v-if="isQDZA">A</template><template v-if="isB">B</template>实行收益月结转，每月结转日前您看到的资产只包含您本金申购赎回后的净额，相关收益将在月结转日后显示，但这不影响您的实际收益。</span>
                        </template>
                    </div>
                </div>
                <div class="btns">
                    <button @click="reser($event, 2, 0)">立即申购</button>
                    <button @click="closeModal(2)">取消</button>
                </div>
            </div>
        </c-modal>
        <c-modal v-if="showSell">
            <div class="sell modal-container" slot="modal-container">
                <div class="title">
                    <span>赎回</span>
                    <a class="btn" @click="closeModal(3)">
                        <img src="../../assets/images/account/index/modal-close.png">
                    </a>
                </div>
                <div class="triangle"></div>
                <div class="content">
                    <div class="row">
                        <span>选择产品：</span>
                        <span class="select active" @click="selectProduct($event)">{{ product.name }}</span>
                    </div>
                    <div class="row">
                        <span>选择账户：</span>
                        <select id="acct-id">
                            <option v-for="item in taInfo" :value="item.acctId">{{ item.name }}</option>
                        </select>
                    </div>
                    <div class="row">
                        <span>赎回份额：</span>
                        <input id="money" v-model="moneyThousands" type="text" :placeholder="'最大份额：' + formatMoney+'份'">
                        <!-- <button class="reser-all" @click="reserAll($event, 1)">全部赎回</button> -->
                    </div>
                    <div class="row hint" >
                        <span >赎回份额：</span>
                        <p >赎回后份额余额不得小于200</p>
                    </div>

                </div>
                <div class="comment">
                    <div class="title">
                        <span>交易</span>
                    </div>
                    <div class="triangle"></div>
                </div>
                <div v-if="isB" class="btns">
                    <div>
                        <button class="sure" @click="reser($event, 3, 0)">确认赎回</button>
                        <span>当日计算收益</span>
                    </div>
                    <div>
                        <button class="back" @click="closeModal(3)">取消</button>
                    </div>
                </div>
                <div v-else class="btns">
                    <div>
                        <button :class="{ 'disable': isB }" @click="reser($event, 3, 1)">快速赎回</button>
                        <span>当日不计算收益</span>
                        <span v-text="isQDZ ? '单日限额5000万元' : ''"></span>
                    </div>
                    <div>
                        <button @click="reser($event, 3, 0)" >普通赎回</button>
                        <span>当日计算收益</span>
                    </div>
                </div>
            </div>
        </c-modal>
        <c-modal v-if="showAuth">
            <div class="auth modal-container" slot="modal-container">
                <div class="title">
                    <span v-text="isOTF ? '场内确权' : '场外确权'"></span>
                    <a class="btn" @click="closeModal(4)">
                        <img src="../../assets/images/account/index/modal-close.png">
                    </a>
                </div>
                <div class="triangle"></div>
                <div class="content">
                    <div class="row">
                        <span>*选择产品：</span>
                        <a id="fund-code" class="btn select active" @click="selectProduct($event)" :data-code="product.prodCode">{{ product.name }}</a>
                    </div>
                    <template v-if="isOTF">
                        <div class="row">
                            <span>*申购金额：</span>
                            <input id="txn-amount"  v-model="txnAmountThousands"   type="text" placeholder="（元）">
                        </div>
                        <div class="row">
                            <span>*股东账号：</span>
                            <input id="ta-account-id" type="text" placeholder="例：B123456789"    >
                        </div>
                        <div class="row">
                            <span>*交易日期：</span>
                            <input id="txn-date" type="text" data-init="0" @click="addCalender($event)">
                        </div>
                    </template>
                    <template v-else>
                        <div class="row">
                            <span>*开户日期：</span>
                            <input id="txn-date" type="text" data-init="0" @click="addCalender($event)">
                        </div>
                        <div class="row">
                            <span class="licence-text">*统一社会信用代码：</span>
                            <input id="licence-no" type="text" placeholder="例：91230123AB1ABCD11C">
                        </div>
                        <div class="row">
                            <span class="investor-text">*企业/基金产品名称：</span>
                            <input id="investor-name" type="text" placeholder="例：外贸信托·锐意01期海洋证券投资">
                        </div>
                        <div class="row">
                            <p class="tips">注：请务必正确填写上述信息，否则确权将失效。</p>
                        </div>
                    </template>
                    <div class="row err-msg" v-if="authErrMsg">
                        <p>{{ authErrMsg }}</p>
                    </div>
                </div>
                <div class="comment">
                    <div class="title">
                        <span v-text="isOTF ? '场内交易' : '场外交易'"></span>
                    </div>
                    <div class="triangle"></div>
                    <div class="detail">
                        <span>注：请贵公司于当日15:00前在<em v-text="isOTF ? '场内交易系统' : '基金公司直销柜台'"></em>完成</span>
                        <span><em>{{ product.name }}</em>交易</span>
                    </div>
                </div>
                <div class="btns">
                    <button @click="confirmAcct($event, 4)" :class="{ disabled: authErrMsg }" :disabled="Boolean(authErrMsg)" data-clicked="0">确权</button>
                    <button @click="closeModal(4)">取消</button>
                </div>
            </div>
        </c-modal>
        <c-modal v-if="showCurrent">
            <div class="current modal-container" slot="modal-container">
                <div class="title">
                    <span v-text="isOTF ? '场内确权' : '场外确权'"></span>
                    <a class="btn" @click="closeModal(5)">
                        <img src="../../assets/images/account/index/modal-close.png">
                    </a>
                </div>
                <div class="triangle"></div>
                <div class="content">
                    <div class="row">
                        <span>*选择产品：</span>
                        <a id="fund-code" class="btn select active" @click="selectProduct($event)" :data-id="product.id">{{ product.name }}</a>
                    </div>
                    <div class="row">
                        <span>*选择账号：</span>
                        <input id="ta-account-id" type="text" v-model='credit' :disabled='addAccount'>
                        <div class="account-list" v-if='accountList'>
                            <ul>
                                <li @click='selectAccount($event)' v-for="info in regularList">{{info}}</li>
                                <li><a @click='addCredit'> +添加账户</a></li>
                            </ul>
                        </div>
                        <div class="list-arrow arrow-top" @click='accountList=!accountList'></div>
                    </div>
                    <div class="row">
                        <span>*申购金额：</span>
                        <input id="txn-amount" type="text" placeholder="（元）"   v-model="txnAmountThousands" >
                    </div>
                    <div class="row err-msg" v-if="authErrMsg">
                        <p>{{ authErrMsg }}</p>
                    </div>
                </div>
                <div class="btns">
                    <button @click="regularOrder($event, 5)" :class="{ disabled: authErrMsg }" :disabled="Boolean(authErrMsg)" data-clicked="0">立即预约</button>
                    <button @click="closeModal(5)">取消</button>
                </div>
            </div>
        </c-modal>
    </div>
</template>
<script>
import productService from '../../services/productService'
import bankService from '../../services/bankService'
import * as cModal from '../../components/Modal'
import {
    eventHub,
    stringTrim,
    errorHandler
} from '../../plugins/utils'
import config from '../../config'

export default {
    components: {
        cModal
    },
    data() {
        return {
                        moneyThousands: '',
            txnAmountThousands: '',

            showOrderBuy: false,
            showOrderSell: false,
            showBuy: false,
            showSell: false,
            showAuth: false,
            showCurrent: false,
            accountList: false,
            addAccount: true,
            selected: '',
            product: {
                id: 0,
                name: '',
                prodCode: '',
                issueId: 0,
                txnType: 0,
                totalAsset: 0,
                marketType: 1
            },
            taInfo: [{
                name: '',
                acctId: ''
            }],
            regularList: [],
            bankInfo: {
                bankName: '',
                shortAcctNo: '0000'
            },
            authErrMsg: '',
            credit: ''

        }
    },
    created() {
        eventHub.$on('showModal', this.showModal);
    },
    beforeMount() {
        let $main = document.querySelector('#main');
        $main.style.cssText = 'background: #f2f2f2';
    },
    beforeDestroy() {
        let $main = document.querySelector('#main');
        $main.style.cssText = '';
        eventHub.$off('showModal');
    },
    watch: {
        moneyThousands() {
            var str = this.moneyThousands;
            this.moneyThousands = this.thousand(str)
        },
        txnAmountThousands() {
            var str = this.txnAmountThousands;
            this.txnAmountThousands = this.thousand(str)
        }

    },

    computed: {
        isB() {
            // 禁用广发货币B快赎
            return this.product.prodCode == '270014';
        },
        isQDZ() {
            // 钱袋子限额
            return this.product.prodCode == '000509';
        },
        isQDZA() {
            // 广发货币A 
            return this.product.prodCode == '270004';
        },
        isOTF() {
            // 场内
            return this.product.marketType == 1;
        },
        formatMoney() {
            let value = this.product.totalAsset;
            if (!isNaN(value) && value != null) {
                let num = parseFloat(value).toFixed(2);
                let regx = /(\d{1,3})(?=(\d{3})+(?:\.))/g;
                return num.replace(regx, "$1,");
            } else {
                return '0.00';
            }
        }
    },
    methods: {
        thousand(num) {
            var arr = num.split(",");
            var str = arr.join('');
            var re = /\d{1,3}(?=(\d{3})+$)/g;　　
            var newStr = str.replace(/^(\d+)((\.\d+)?)$/, function(s, s1, s2) {
                return s1.replace(re, "$&,") + s2;
            });　
            return newStr
        },
        selectProduct(e) {
            let $dom = $(e.target);
            $dom.hasClass('active') ? $dom.removeClass('active') : $dom.addClass('active');
        },
        addCalender(e) {
            let $dom = $(e.target);
            if (!$dom.data('init')) {
                $dom.calendar();
                $dom.calendar('open');
                $dom.data('init', 1);
            }
        },
        selectAccount(e) {
            let [$dom, credit, _self] = [e.target, '', this];
            credit = $dom.innerHTML;
            _self.credit = credit;
            _self.accountList = false;
            _self.addAccount = true

        },
        addCredit() {
            let [_self, $dom] = [this, $("#ta-account-id")];
            _self.accountList = false;
            _self.addAccount = false;
            _self.credit = '';
            $dom.focus();
        },
        reser(e, modalType, reserType) {
            let $content = $(e.target).parents('.btns').siblings('.content');
            let $prodcut = $content.find('.select');
            let $input = $content.find('input');
            let $acctId = $content.find('#acct-id');
            let moneyStr = $input.val();
                moneyStr=Number(moneyStr.replace(/,/g, ''));
            let dataObj = this.product;
            let money=Number(moneyStr);
            const remaining=this.product.totalAsset-money
            if (!$prodcut.hasClass('active')) {
                $.alert('请选择产品');
            } else if (money === 0) {
                $.alert('份额不能为0');
            }  else if (remaining<200 && remaining!=0) {
                $.alert('赎回后份额余额不得小于200');
            } else if (modalType == 2 && dataObj.prodCode == '000509' && money > 20000000) {
                // 广发申购限额
                $.alert('超出申购限额');
            } else if (modalType == 2 && dataObj.prodCode == '270014' && money < 50000000) {
                $.alert('500万起投');
            } else if (modalType == 2 && dataObj.prodCode == '270004' && money == 0) {
                $.alert('申购金额应大于0');
            } else {
                (modalType == 0 || modalType == 2) ? money = money: null;
                (reserType == 0) ? productService.reser(dataObj.id, money, dataObj.issueId, dataObj.txnType, $acctId.val(), modalType, this): productService.quickWithdraw(dataObj.id, money, $acctId.val(), this);
                this.closeModal(modalType);
            }
        },
        // reserAll(e, modalType) {
        //     let $content = $(e.target).parent().siblings('.row');
        //     let $prodcut = $content.find('.select');
        //     let $acctId = $content.find('#acct-id');
        //     let dataObj = this.product;
        //     let money = dataObj.totalAsset;
        //     if (!$prodcut.hasClass('active')) {
        //         $.alert('请选择产品');
        //     } else if (money == 0) {
        //         $.alert('该产品可赎回金额为0');
        //     } else {
        //         productService.reser(dataObj.id, money, dataObj.issueId, dataObj.txnType, $acctId.val(), modalType, this);
        //         this.closeModal(modalType);
        //     }
        // },
        confirmAcct(e, modalType) {
            let [payload, _self] = [{}, this];
            if (_self.isOTF) {
                let $fundCode = document.getElementById('fund-code');
                let $taAccountId = document.getElementById('ta-account-id');
                let $txnAmount = document.getElementById('txn-amount');
                let $txnDate = document.getElementById('txn-date');
                if ($fundCode.className.indexOf('active') == -1) {
                    $.alert('请选择产品');
                    return false;
                } else if (!stringTrim($txnAmount.value)) {
                    $.alert('申购金额不能为空');
                    return false;
                } else if (!stringTrim($taAccountId.value)) {
                    $.alert('股东账号不能为空');
                    return false;
                } else if (!stringTrim($txnDate.value)) {
                    $.alert('交易时间不能为空');
                    return false;
                }
                let money =$txnAmount.value;
                money=parseInt(money.replace(/,/g, ''));
                payload = {
                    fundCode: $fundCode.dataset.code,
                    taAccountId: $taAccountId.value,
                    txnAmount:money,
                    txnDate: $txnDate.value
                }
            } else {
                let $txnDate = document.getElementById('txn-date');
                let $licenceNo = document.getElementById('licence-no');
                let $investorName = document.getElementById('investor-name');
                if (!stringTrim($txnDate.value)) {
                    $.alert('开户日期不能为空');
                    return false;
                } else if (!stringTrim($licenceNo.value)) {
                    $.alert('组织机构代码不能为空');
                    return false;
                } else if (!stringTrim($investorName.value)) {
                    $.alert('名称不能为空');
                    return false;
                }
                payload = {
                    txnDate: $txnDate.value,
                    licenceNo: $licenceNo.value,
                    investorName: $investorName.value
                }
            }
            _self.btnClicked(e).then(() => {
                productService.confirmAcct(payload, _self).then(() => {
                    $.alert('提交成功');
                    _self.closeModal(modalType);
                }, (errCode) => {
                    switch (errCode) {
                        case null:
                            $.alert('提交失败');
                            _self.closeModal(modalType);
                            break;
                        case 'J0011':
                            _self.authErrMsg = '已确权成功，无需二次确权！';
                            break;
                        case 'J0014':
                            _self.authErrMsg = '确权进行中，请等待确权结果...';
                            break;
                        default:
                            errorHandler(errCode);
                            _self.closeModal(modalType);
                            break;
                    }
                }).then(() => {
                    e.target.dataset.clicked = 0;
                });
            });
        },
        // 定期产品预约
        regularOrder(e, modalType) {
            let [parm, _self] = [{}, this];
            let $fundCode = document.getElementById('fund-code');
            let $taAccountId = document.getElementById('ta-account-id');
            let $txnAmount = document.getElementById('txn-amount');
            if ($fundCode.className.indexOf('active') == -1) {
                $.alert('请选择产品');
                return false;
            } else if (!stringTrim($taAccountId.value)) {
                $.alert('请选择账户');
                return false;
            } else if ($txnAmount.value == '' || $txnAmount.value == 0) {
                $.alert('请输入预约金额');
                return false;
            }
            let money =$txnAmount.value;
                money=parseInt(money.replace(/,/g, ''));
            parm = {
                productId: $fundCode.dataset.id,
                investorName: $taAccountId.value,
                amount:money
            }
            productService.regular(parm, _self);
            this.closeModal(modalType);

        },
        showModal(objData) {
            let _self = this;
            // _self.$root.popping = true;
            _self.product = objData.product;
            if (objData.getAsset) {
                productService.getTotalAsset(objData.product.id, _self).then((data) => {
                    objData.product.totalAsset = data;
                })
            }
            if (objData.product.issueId == 2) {
                productService.getTaInfo(2, _self).then((data) => {
                    _self.taInfo = data;
                    let selected = data[0].acctId;
                    _self.selected = selected;
                })
            }
            if (objData.modalType == 5) {
                productService.regularAccount(_self).then((data) => {
                    let regularList = data.resultList;
                    let arrList = [];
                    for (var i = 0; i < regularList.length; i++) {
                        arrList.push(regularList[i].investorName)
                    }
                    _self.regularList = arrList

                })

            }
            switch (objData.modalType) {
                case 0:
                    _self.showOrderBuy = true;
                    break;
                case 1:
                    _self.showOrderSell = true;
                    break;
                case 2:
                    _self.showBuy = true;
                    break;
                case 3:
                    _self.showSell = true;
                    break;
                case 4:
                    _self.authErrMsg = '';
                    _self.showAuth = true;
                    break;
                case 5:
                    _self.showCurrent = true;
                default:
                    break;
            }
        },
        closeModal(modalType) {
            this.$root.popping = false;
            switch (modalType) {
                 case 2:
                    this.showBuy = false;
                    this.moneyThousands='';
                    break;
                case 3:
                    this.showSell = false;
                    this.moneyThousands='';
                    break;
                case 4:
                    this.showAuth = false;
                    this.txnAmountThousands='';
                    break;
                case 5:
                    this.showCurrent = false;
                    this.txnAmountThousands='';
                    break;
            }
        },
        btnClicked(e) {
            return new Promise((resolve, reject) => {
                let $dom = e.target;
                if ($dom.dataset.clicked == 0) {
                    $dom.dataset.clicked = 1;
                    resolve();
                } else {
                    reject();
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/stylesheets/account/index.scss";
#txn-date {
    background: url('../../assets/images/common/calender.png') no-repeat 98% .2rem;
    background-size: .4rem;
}

#account {
    .wealth {
        .icon {
            background: url(../../assets/images/account/index/wealth.png) no-repeat center;
            background-size: contain;
        }
        &.active {
            .icon {
                background-image: url(../../assets/images/account/index/wealth-a.png);
            }
        }
    }
    .product {
        .icon {
            background: url(../../assets/images/account/index/product.png) no-repeat center;
            background-size: contain;
        }
        &.active {
            .icon {
                background-image: url(../../assets/images/account/index/product-a.png);
            }
        }
    }
    .trade {
        .icon {
            background: url(../../assets/images/account/index/trade.png) no-repeat center;
            background-size: contain;
        }
        &.active {
            .icon {
                background-image: url(../../assets/images/account/index/trade-a.png);
            }
        }
    }
    .point {
        .icon {
            background: url(../../assets/images/account/index/point.png) no-repeat center;
            background-size: contain;
        }
        &.active {
            .icon {
                background-image: url(../../assets/images/account/index/point-a.png);
            }
        }
    }
    .system {
        .icon {
            background: url(../../assets/images/account/index/system.png) no-repeat center;
            background-size: contain;
        }
        &.active {
            .icon {
                background-image: url(../../assets/images/account/index/system-a.png);
            }
        }
    }
}
</style>
