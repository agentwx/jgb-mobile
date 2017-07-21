<template>
<div>
    <div  v-if="pageNo==0" id="wealth">
        <c-exp></c-exp>
        <div class="wealth-count">
               <div class="row title">
                 <span>我的资产</span>
               </div>
                <div class="row">
                    <div class="block">
                        <span>总资产（元）</span>
                    </div>
                    <div class="block">
                        <strong>{{ wealth.totalAsset | formatMoney }}</strong>
                    </div>
                </div>
                <div class="row">
                    <div class="block">
                        <span>昨日收益（元）</span>
                    </div>
                    <div class="block">
                        <span>{{ wealth.nowdayIncome | formatMoney }}</span>
                    </div>
                </div>
                <div class="row">
                    <div class="block">
                        <span>累计收益（元）</span>
                    </div>
                    <div class="block">
                        <span>{{ wealth.totalIncome | formatMoney }}</span>
                    </div>
                </div>
        </div>

        <div class="wealth-hold">
            <div class="content">
                <div class="text" @click='details'>
                    我的资产明细
                </div>
                <div class="explain"><span>机构宝平台所显示的持有资产为经基金公司确认的资产，在途资产可以登录基金公司官网查看。</span></div> 
                <div class="logo">
                    <img src="../../assets/images/account/wealth/logo-white.png">
                </div>
            </div>
        </div>
    </div>
    <template  v-if="pageNo==1">
    <div id="details">
         <div  class="details-title">
                <span @click="back">返回</span> 我的资产明细
         </div> 
        <div class="details">
            <div class="content" v-if="wealth.orgNo!=''">
                <template v-for="organItem in wealth.orgTaAcctlist">
                    <div class="organ">
                        <div class="title">
                            <span>{{ organItem.investorName }}</span>
                        </div>
                        <div class="products">
                            <template v-for="product in organItem.taWealthAcctlist">
                                <div class="product">
                                    
                                    <div class="wrap">
                                    <div class="left">
                                    <div class="top">
                                        <div class="name">
                                            <span>{{ product.prodName }}</span><em class="type " :class='{regular:product.productType != 0}'>{{product.productType == 0?'活期':'定期'}}  </em>
                                        </div>
                                    </div>
                                        <div class="row">
                                            <span class="intro">{{product.issueId == 3? '金额(元)' :'持有资产（元）'}}</span>
                                            <span class="strong">{{ product.totalAsset | formatMoney }}</span>
                                        </div>
                                        <template  v-if="product.issueId == 3">
                                           <div class="row">
                                            <span class="intro">期限（天）</span>
                                            <span class="number">{{ product.valueDuration }}</span><span :style="{'margin-left': '1rem'}">预期报价收益率</span><span  class="number" :style="{'margin-left':'.1rem'}">{{ product.seventhYearYield | toPercent }}%</span>
                                        </div>
                                        </template>
                                        <template  v-else>
                                           <div class="row">
                                            <span class="intro">昨日收益（元）</span>
                                            <span class="number">{{ product.nowdayIncome | formatMoney }}</span>
                                        </div>
                                        <div class="row">
                                            <span class="intro">累计收益（元）</span>
                                            <span class="number">{{ product.totalIncome | formatMoney }}</span>
                                        </div>
                                        </template>
                                       
                                    </div>
                                    <div class="right" v-if="product.issueId == 2">
                                        <button class="buy" @click="openModal($event, 2, 0)" :data-id="product.productId" :data-issue="product.issueId" :data-name="product.prodName" :data-type="product.securityMarketType" :data-code="product.prodCode">申购</button>
                                        <button class="sell" @click="openModal($event, 3, 1)" :data-id="product.productId" :data-issue="product.issueId" :data-name="product.prodName" :data-asset="product.totalAsset" :data-type="product.securityMarketType" :data-code="product.prodCode">赎回</button>
                                    </div>
                                </div> 
                             </div>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
            <div class="content none-organ" v-else>
                <div class="none">
                    <img src="../../assets/images/account/wealth/none.png">
                    <span>您暂无投资任何项目</span>
                </div>
            </div>
        </div>
    </div>
</template>
</div>
</template>

<script>
    import * as cExp from '../../components/Exp'
    import { eventHub } from '../../plugins/utils'

    export default {
        data () {
            return {
                pageNo: 0
            }
        },
        components: {
            cExp
        },
        computed: {
            wealth () {
                return this.$store.getters.getWealth
            }
        },
        activated () {
                this.$root.heightCls=false;
            this.$store.dispatch('fetchWealth');
        },
        methods: {
            details (){
                this.pageNo=1
            },
            back (){
                this.pageNo=0
            },
            openModal (e, modalType, txnType) {
                this.$root.popping=true;
                let [$dom, objData] = [$(e.target), {}];
                objData = {
                    product: {
                        id: $dom.data('id'),
                        name: $dom.data('name'),
                        prodCode: $dom.data('code'),
                        issueId: $dom.data('issue'),
                        txnType: txnType,
                        totalAsset: $dom.data('asset'),
                        marketType: $dom.data('type')
                    },
                    getAsset: false,
                    modalType: modalType
                };
                eventHub.$emit('showModal', objData);
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/account/wealth.scss";
</style>
