<template>
    <div id="trade">
        <div class="top">
            <div class="tab">
                <div class="active" data-type="0">
                    <span @click="clickTab($event)">交易</span>
                </div>
                <div data-type="1">
                    <span @click="clickTab($event)">收益</span>
                </div>
            </div>
        </div>
        <div class="bottom">
            <div class="trade area" v-if="tradePage">
                <div class="title">
                    <div class="name">
                        <span>| 交易记录</span>
                    </div>
                    <div class="filter">
                        <div class="active" data-type="0" @click="clickFilter($event)">
                            <a class="icon"></a>
                            <span>申购</span>
                        </div>
                        <div class="active" data-type="1" @click="clickFilter($event)">
                            <a class="icon"></a>
                            <span>赎回</span>
                        </div>
                    </div>
                </div>
                <div class="screen">
                    <input id="start-date" type="text" v-model="startDate" data-init="0" readonly="readonly" @click="addCalender($event)">-
                    <input id="end-date" type="text" v-model="endDate" data-init="0" readonly="readonly" @click="addCalender($event)">
                    <button type="search" @click="search()">搜索</button>
                </div>
                <div class="list" v-if="tradeList.length">
                    <template v-for="item in tradeList">
                        <div class="tradeRecord">
                            <div class="left">
                                <div class="line"></div>
                                <div class="point-layout">
                                    <div class="time-point"></div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="top">
                                    <span>{{ item.txnTime | formatDate('yyyy.MM.dd') }}</span>
                                    <span>{{ item.txnType | tradeType }}</span>
                                </div>
                                <div class="middle">
                                    <div class="name">
                                        <img src="../../assets/images/account/trade/product.png" alt="">
                                        <span>{{ item.prodName | formatProdName('0') }} {{ item.prodName | formatProdName('1') }}</span>
                                    </div>
                                    <div class="price">
                                        <span>{{ item.txnAmount | formatMoney }}<em>{{ item.txnType==1 ?'份':'元'}}</em></span>
                                    </div>
                                </div>
                                <!--<div class="report">-->
                                <!--<span>备注: {{ item.remark }}</span>-->
                                <!--</div>-->
                            </div>
                        </div>
                    </template>
                </div>
                <div v-else></div>
            </div>
            <div class="income area" v-else>
                <div class="title">
                    <span>| 收益</span>
                </div>
                <div class="screen">
                    <input id="start-date" type="text" v-model="startDate" data-init="0" readonly="readonly" @click="addCalender($event)">-
                    <input id="end-date" type="text" v-model="endDate" data-init="0" readonly="readonly" @click="addCalender($event)">
                    <button type="search" @click="search()">搜索</button>
                </div>
                <div class="list" v-if="incomeList.length">
                    <template v-for="item in incomeList">
                        <div class="incomeRecord">
                            <div class="left">
                                <div class="line"></div>
                                <div class="point-layout">
                                    <div class="time-point"></div>
                                </div>
                            </div>
                            <div class="right">
                                <div class="top">
                                    <span>{{ item.time | formatDate('yyyy.MM.dd') }}</span>
                                </div>
                                <div class="income">
                                    <span>每日基金收益: </span>
                                    <span>{{ item.income | formatMoney }}<em>元</em></span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div v-else></div>
            </div>
        </div>
    </div>
</template>
<script>
import config from '../../config'
import {
    errorHandler,
    logger,
    dateFormat
} from '../../plugins/utils'

export default {
    data() {
            return {
                loading: false,
                pageNum: 1,
                recordLength: 10,
                tradeList: [],
                incomeList: [],
                tradePage: true,
                firstTime: 0,
                lastTime: 0,
                txnType: '',
                startDate: '',
                endDate: ''
            }
        },
        created() {
            let date = new Date();
            let year = date.getFullYear();
            let mon = date.getMonth();
            let mon1 = date.getMonth() + 1;
            let day = date.getDate();
            let today = ''
            switch (mon1) {
                case 1:
                    today = (year - 1) + "-07-" + (day < 10 ? "0" + day : day);
                    break;
                case 2:
                    today = (year - 1) + "-08-" + (day < 10 ? "0" + day : day);
                    break;
                case 3:
                    today = (year - 1) + "-09-" + (day < 10 ? "0" + day : day);
                    break;
                case 4:
                    today = (year - 1) + "-10-" + (day < 10 ? "0" + day : day);
                    break;
                case 5:
                    today = (year - 1) + "-11-" + (day < 10 ? "0" + day : day);
                    break;
                case 6:
                    today = (year - 1) + "-12-" + (day < 10 ? "0" + day : day);
                    break;
                default:
                    today = year + '-' + (mon1 - 1) + (day < 10 ? "0" + day : day);

            }
            let today1 = date.getFullYear() + "-" + (mon1 < 10 ? "0" + mon1 : mon1) + "-" + (day < 10 ? "0" + day : day);
            this.startDate = today;
            this.endDate = today1;
        },

        activated() {
            let _self = this;
            _self.fetchTradeList(1, '', true);
            $(document.body).infinite(50).on("infinite", function() {
                if (_self.loading) return;
                _self.loading = true;
                (_self.tradePage) ? _self.fetchTradeList(_self.pageNum, _self.txnType, false): _self.fetchIncomeList(_self.pageNum, false);
            });
        },
        deactivated() {
            $(document.body).destroyInfinite();
        },
        watch: {
            recordLength: {
                handler(val) {
                    if (val < 10) {
                        $(document.body).destroyInfinite();
                    }
                },
                deep: true
            }
        },
        methods: {
            addCalender(e) {
                let $dom = $(e.target);
                let val = $dom.val();
                if (!$dom.data('init')) {
                    $dom.calendar();
                    $dom.calendar('open', val);
                    $dom.data('init', 1);
                }
            },
            search() {
                let _self = this;
                let startDate = $("#start-date").val();
                let endDate = $("#end-date").val();
                _self.startDate = startDate;
                _self.endDate = endDate;
                (_self.tradePage) ? _self.fetchTradeList(1, '', true): _self.fetchIncomeList(1, true);
            },
            fetchTradeList(pageNo, txnType, refresh) {
                let [data, errCode, _self] = ['', '', this];
                let startDate = $("#start-date").val();
                let endDate = $("#end-date").val();
                let query = '?startDate='+startDate+'&endDate='+endDate+'&pageNo=' + pageNo + '&txnType=' + txnType + '&pageSize=10';
                _self.$http.get(config.ajax._get.tradeList + query).then((resp) => {
                    data = resp.body;
                    errCode = data.errCode;
                    if (!errCode) {
                        if (data.data.resultList) {
                            (refresh) ? _self.tradeList = data.data.resultList: _self.tradeList = _self.tradeList.concat(data.data.resultList);
                            _self.pageNum = data.data.pageNo + 1;
                            _self.recordLength = data.data.resultList.length;
                        } else {
                            _self.recordLength = 0;
                        }
                    } else {
                        errorHandler(errCode);
                    }
                    _self.loading = false;
                }, (resp) => {
                    logger.error('获取交易记录失败，错误码[' + resp.status + ']');
                    _self.loading = false;
                });
            },
            fetchIncomeList(pageNo, refresh) {
                let [data, errCode, _self] = ['', '', this];
                let startDate = $("#start-date").val();
                let endDate = $("#end-date").val();
                let query = '?startDate=' + startDate + '&endDate=' + endDate + '&pageNo=' + pageNo;
                _self.$http.get(config.ajax._get.income + query).then((resp) => {
                    data = resp.body;
                    errCode = data.errCode;
                    if (!errCode) {
                        if (data.data.resultList) {
                            (refresh) ? _self.incomeList = data.data.resultList: _self.incomeList = _self.incomeList.concat(data.data.resultList);
                            _self.pageNum = data.data.pageNo + 1;
                            _self.recordLength = data.data.resultList.length;
                        } else {
                            _self.recordLength = 0;
                        }
                    } else {
                        errorHandler(errCode);
                    }
                    _self.loading = false;
                }, (resp) => {
                    logger.error('获取收益记录失败，错误码[' + resp.status + ']');
                    _self.loading = false;
                });
            },
            clickTab(e) {
                let $dom = $(e.target).parent();
                let type = $dom.data('type');
                if (!$dom.hasClass('active')) {
                    if (type == 0) {
                        this.tradePage = true;
                        this.fetchTradeList(1, '', true);
                    } else {
                        this.tradePage = false;
                        this.fetchIncomeList(1, true);
                    }
                    this.pageNo = 1;
                    this.recordLength = 10;
                    $dom.addClass('active').siblings().removeClass('active');
                }
            },
            clickFilter(e) {
                let [$dom, tagName] = ['', e.target.tagName.toLowerCase()];
                (tagName == 'div') ? $dom = $(e.target): $dom = $(e.target).parent();
                let $filter = $dom.parent();
                if (!$dom.hasClass('active')) {
                    $dom.addClass('active');
                } else {
                    $dom.removeClass('active');
                }
                switch ($filter.find('.active').length) {
                    case 1:
                        this.txnType = $filter.find('.active').data('type');
                        break;
                    case 2:
                        this.txnType = '';
                        break;
                }
                this.fetchTradeList(1, this.txnType, true);
            }
        }
}
</script>
<style lang="scss" scoped>
@import "../../assets/stylesheets/account/trade.scss";
#trade {
    .bottom {
        .filter {
            div {
                .icon {
                    background: url(../../assets/images/account/trade/nonSeleted.png) no-repeat center;
                    background-size: contain;
                }
                span {
                    color: $borderColor;
                    ;
                }
                &.active {
                    .icon {
                        background-image: url(../../assets/images/account/trade/seleted.png);
                    }
                    span {
                        color: $colorBlue;
                        ;
                    }
                }
            }
        }
    }
}
</style>
