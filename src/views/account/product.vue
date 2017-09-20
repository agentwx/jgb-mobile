<template>
    <div id="product">
        <div class="top-nav">
            <div class="tab">
                <span class="active" @click="changeActive($event)">活期产品</span><span @click="changeActive($event)">定期产品</span>
            </div>
        </div>
        <template v-if="!current">
            <div class="section">
                <div class="title hxvenue">
                    <span>券商资管</span>
                </div>
                <div class="content">
                    <template v-for="(item, index) in filterHxProducts">
                        <div class="item" :key="index">
                            <div class="top">
                                <div class="name">
                                    <a :href="item.linkUrl">
                                        <span>{{ item.name }}</span>
                                    </a>
                                </div>
                                <template v-if="item.prodCode=='000509'">
                                    <div class="point">
                                        <span>{{ item.endDate | redeemType }}</span>
                                    </div>
                                </template>
                            </div>
                            <div class="middle">
                                <div class="block">
                                    <span class="intro">七日年化收益率</span>
                                    <span class="number">{{ item.seventhYearYield | toPercent }}
                                        <em>%</em>
                                    </span>
                                </div>
                                <div class="block">
                                    <span class="intro">万份收益:
                                        <em>{{ item.yieldPerMillion | keepDecimal }}</em>元</span>
                                    <span class="intro">爱 心 值:
                                        <em>{{item.pointRate | tonIteger}}/亿</em>
                                    </span>
                                    <span class="intro">更新日期:
                                        <em>{{ item.uptTime | formatDate('yyyy.MM.dd') }}</em>
                                    </span>
                                </div>
                                <div class="block">
                                    <button class="buy" @click="openModal($event, 2, 2, 0)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode" :data-forwardType='item.carryForwardType'>申购</button>
                                    <button class="sell" @click="openModal($event, 3, 2, 1)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">赎回</button>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="section ">
                <div class="title venue">
                    <span>场内基金</span>
                    <div class="btns">
                        <a class="btn" @click="showTip()">什么是确权？</a>
                    </div>

                </div>
                <div class="content">
                    <template v-for="(item,index) in filterMarketType(1)" v-if="item.issueId!=4">
                        <div class="item" :key="index">
                            <div class="top">
                                <div class="name">
                                    <a :href="item.linkUrl">
                                        <span>{{ item.name }}</span>
                                    </a>
                                </div>
                            </div>
                            <div class="middle">
                                <div class="block">
                                    <span class="intro">七日年化收益率</span>
                                    <span class="number">{{ item.seventhYearYield | toPercent }}
                                        <em>%</em>
                                    </span>
                                </div>
                                <div class="block">
                                    <span class="intro">万份收益：
                                        <em>{{ item.yieldPerMillion | keepDecimal }}</em>元</span>
                                    <span class="intro">爱 心 值:
                                        <em>{{item.pointRate | tonIteger}}/亿</em>
                                    </span>
                                    <span class="intro">更新日期:
                                        <em>{{ item.uptTime | formatDate('yyyy.MM.dd') }}</em>
                                    </span>
                                </div>
                                <div class="block">
                                    <button class="auth" @click="openModal($event, 4, 1, 2)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">场内确权</button>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="section">
                <div class="title outer">
                    <span>场外基金</span>
                </div>
                <div class="content">
                    <template v-for="(item,index) in filterMarketType(2)" v-if="item.issueId!=4">
                        <div class="item" :key="index">
                            <div class="top">
                                <div class="name">
                                    <a :href="item.linkUrl">
                                        <span>{{ item.name }}</span>
                                    </a>
                                </div>
                                <template v-if="item.prodCode=='000509'">
                                    <div class="point">
                                        <span>{{ item.endDate | redeemType }}</span>
                                    </div>
                                </template>
                            </div>
                            <div class="middle">
                                <div class="block">
                                    <span class="intro">七日年化收益率</span>
                                    <span class="number">{{ item.seventhYearYield | toPercent }}
                                        <em>%</em>
                                    </span>
                                </div>
                                <div class="block">
                                    <span class="intro">万份收益:
                                        <em>{{ item.yieldPerMillion | keepDecimal }}</em>元</span>
                                    <span class="intro">爱 心 值:
                                        <em>{{item.pointRate | tonIteger}}/亿</em>
                                    </span>
                                    <span class="intro">更新日期:
                                        <em>{{ item.uptTime | formatDate('yyyy.MM.dd') }}</em>
                                    </span>
                                </div>
                                <div class="block">
                                    <template v-if="item.issueId == 1">
                                        <button class="auth" @click="openModal($event, 4, 2, 2)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">场外确权</button>
                                    </template>
                                    <template v-else>
                                        <button class="buy" @click="openModal($event, 2, 2, 0)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode" :data-forwardType='item.carryForwardType'>申购</button>
                                        <button class="sell" @click="openModal($event, 3, 2, 1)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">赎回</button>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <template v-if="current">
            <div class="section">
                <div class="content ">
                    <template v-for="(item, index) in filterDqProducts">
                        <div class="item item-current" :class='{"current-end":item.endFlag===true}' :key="index">
                            <div class="top top-current ">
                                <div class="name">
                                    <span>{{ item.name }}<br v-if="item.name.length>10 && item.name.length<18">
                                        <em :class="{'site':item.name.length>18}"> {{item.pointRate | tonIteger}}/亿元（日终存量）</em>
                                    </span>
                                </div>
                            </div>
                            <div class="middle current">
                                <div class="block">
                                    <span class="intro">预期报价收益率</span>
                                    <span class="number">{{ item.yieldPerMillion | toPercent }}
                                        <em>%</em>
                                    </span>
                                </div>
                                <div class="block">
                                    <span class="intro">期限（天）</span>
                                    <span class="number">{{item.valueDuration}}</span>
                                </div>
                                <template v-if="item.endFlag===false">
                                    <div class="block">
                                        <button class="buy" @click="viewDetail()" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">查看详情</button>
                                        <button class="sell" @click="openModal($event, 5, 2, 1)" :data-id="item.id" :data-issue="item.issueId" :data-name="item.name" :data-code="item.prodCode">预约</button>
                                    </div>
                                </template>
                                <template v-else>
                                    <div class="block">
                                        <span>已结束</span>
                                    </div>
                                </template>
                            </div>
                            <div class="bottom">
                                <div class="block">
                                    <span>资金追加日:
                                        <em>{{ item.fundAccessDate | formatDate('yyyy.MM.dd') }}</em>
                                    </span>
                                    <span>产品计息日:
                                        <em>{{ item.yieldStartDate | formatDate('yyyy.MM.dd') }}</em>
                                    </span>
                                </div>
                                <div class="block">
                                    <span>产品到期日:
                                        <em>{{ item.yieldEndDate | formatDate('yyyy.MM.dd') }}</em>
                                    </span>
                                    <span>资金到账日:
                                        <em>{{ item.fundExitDate | formatDate('yyyy.MM.dd') }}</em>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </template>
        <c-modal v-if="showTips">
            <div class="tips modal-container" slot="modal-container">
                <div class="title">
                    <span>什么是确权</span>
                    <a class="btn" @click="hideTip()">
                        <img src="../../assets/images/account/index/modal-close.png">
                    </a>
                </div>
                <div class="content">
                    <span>
                        <em>确权</em>是将贵公司的交易
                        <em>登记</em>在机构宝平台名下，登记成功会计算
                        <em>爱心值</em><br>
                        <em>T日的交易</em>，T+1日基金公司确认，
                        <em>T+2日</em>在机构宝平台
                        <em>查询资产、收益和爱心值</em>。</span>
                </div>
            </div>
        </c-modal>
    </div>
</template>
<script>
import { eventHub } from '../../plugins/utils'
import * as cModal from '../../components/Modal'

export default {
    components: {
        cModal
    },
    data() {
        return {
            showTips: false,
            current: false
        }
    },
    activated() {
        this.$store.dispatch('fetchProducts');
    },
    computed: {
        products() {
            return this.$store.getters.getProducts
        },
        filterHxProducts() {
            let _self = this;
            const hxProducts = _self.products.filter((product) => {
                return product.issueId == 4
            })
            return hxProducts

        },
        filterDqProducts() {
            let _self = this;
            const dQProducts = _self.products.filter((product) => {
                return product.issueId == 3
            })
            return dQProducts

        }
    },
    methods: {
        filterMarketType(type) {
            let _self = this;
            return _self.products.filter((product) => {
                return product.securityMarketType == type
            })
        },
        changeActive(e) {
            this.current = !this.current;
            var $dom = $(e.target)
            $dom.addClass('active').siblings().removeClass('active');
        },
        showTip() {
            this.showTips = true
            this.$root.popping = true;

        },
        hideTip() {
            this.showTips = false
            this.$root.popping = false;
        },
        openModal(e, modalType, marketType, txnType) {
            let [$dom, objData] = [$(e.target), {}];
            objData = {
                product: {
                    id: $dom.data('id'),
                    name: $dom.data('name'),
                    prodCode: $dom.data('code'),
                    issueId: $dom.data('issue'),
                    carryForwardType: $dom.data('forwardtype'),
                    txnType: txnType,
                    totalAsset: 0,
                    remainAmount: 0,
                    marketType: marketType
                },
                getAsset: false,
                modalType: modalType
            };
            if (modalType == 1 || modalType == 3) {
                objData.getAsset = true;
            }
            eventHub.$emit('showModal', objData);
        },
        viewDetail(e) {
            $.alert('请在pc端查看一页通')
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../assets/stylesheets/account/product";
</style>
