<template>
    <div id="point">
        <c-exp></c-exp>
        <div class="point">
            <div class="title">
                <span>| 爱心记录</span>
            </div>
            <div id="list" class="content" v-if="pointsRecord.length">
                <template v-for="item in pointsRecord">
                    <div class="pointsRecord">
                        <div class="left">
                            <div class="line"></div>
                            <div class="point-layout">
                                <div class="time-point"></div>
                            </div>
                        </div>
                        <div class="right">
                            <div class="top">
                                <span>{{ item.time | formatDate('yyyy-MM-dd') }}</span>
                                <span>{{ item.actionDesc }}</span>
                            </div>
                            <div class="middle">
                                <div class="name">
                                    <img src="../../assets/images/account/point/account.png" alt="">
                                    <span>{{ item.investorName }}</span>
                                </div>
                            </div>
                            <div class="bottom">
                                <div class="cpoint">
                                    <div class="content">
                                        <span>{{ item.point }}</span>
                                    </div>
                                    <div class="content">
                                        <span>爱心值</span>
                                    </div>
                                </div>
                                <div class="product">
                                    <div class="row">
                                        <span>产品：</span>
                                        <span>{{ item.productName }}</span>
                                    </div>
                                    <div class="row">
                                        <span>金额：</span>
                                        <span>{{ item.memo | formatMoney }}元</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="content" v-else>
            </div>
        </div>
    </div>
</template>

<script>
    import config from '../../config'
    import { errorHandler, logger } from '../../plugins/utils'
    import * as cExp from '../../components/Exp'

    export default {
        components: {
            cExp
        },
        data () {
            return {
                loading: false,
                pageNum: 1,
                pointsRecord: [],
                recordLength: 10
            }
        },
        activated () {
            let _self = this;
            _self.fetchPointsRecord(1, true);
            // 上拉加载
            $(document.body).infinite(50).on("infinite", function () {
                if (_self.loading) return;
                _self.loading = true;
                _self.fetchPointsRecord(_self.pageNum, false);
            });
        },
        deactivated () {
            $(document.body).destroyInfinite();
        },
        watch: {
            recordLength: {
                handler (val) {
                    if (val < 10 ) {
                        $(document.body).destroyInfinite();
                    }
                },
                deep: true
            }
        },
        methods: {
            fetchPointsRecord (pageNo, refresh){
                let [data, errCode,_self] = ['', '', this];
                let query = '?type=-1&pageNo=' + pageNo;
                _self.$http.get(config.ajax._get.points + query).then((resp) => {
                    data = resp.body;
                    errCode = data.errCode;
                    if (!errCode) {
                        if (data.data.resultList) {
                            (refresh) ? _self.pointsRecord = data.data.resultList : _self.pointsRecord = _self.pointsRecord.concat(data.data.resultList);
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
                    logger.error('获取积分记录失败，错误码[' + resp.status + ']');
                    _self.loading = false;
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/account/point.scss";
</style>
