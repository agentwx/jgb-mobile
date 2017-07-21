<template>
    <div id="system">
        <div class="index" v-if="pageNo == 0">
            <div class="item-list">
                <template v-for="(item, index) in itemList">
                    <div class="item" :class="item.className" @click="pageNo = index + 1">
                        <div class="title">
                            <img :src="item.imgSrc" alt="logo">
                            <span v-text="item.name"></span>
                        </div>
                        <i class="more"></i>
                    </div>
                </template>
            </div>
            <div class="logout">
                <button @click="exit">退出登录</button>
            </div>
        </div>
        <div class="account" v-if="pageNo == 1">
            <div class="title">
                <div class="back" @click="back">
                    <i class="icon"></i>
                    <em>返回</em>
                </div>
                <span>账户信息</span>
            </div>
            <template v-for="item in accountInfo">
                <div class="item">
                    <div class="top">
                        <span v-text="item.investorName || '--'"></span>
                    </div>
                    <div class="bottom">
                        <div class="left">
                            <div class="code">
                                <span>
                                    股东/基金账号：
                                    <em v-text="item.taAccountId || '无'"></em>
                                </span>
                            </div>
                            <div class="status">
                                <i class="icon" :class="statusHandler(item.status, 0)"></i>
                                <span v-text="item.issueId == 1 ? '确权' : '开户'"></span>
                                <span v-text="statusHandler(item.status, 1)"></span>
                            </div>
                        </div>
                        <div class="right">
                            <div class="type">
                                <span :class="item.issueId == 1 ? 'cx' : 'gf'" v-text="item.issueId == 1 ? '长信' : '广发'"></span>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="company" v-if="pageNo == 2">
            <div class="section">
                <div class="title">
                    <span>| 企业信息<em>（编辑请登陆官方网站）</em></span>
                </div>
                <div class="content">
                    <div class="row">
                        <span>企业全称</span>
                        <span>{{ tradeInfo.orgName }}</span>
                    </div>
                    <div class="row">
                        <span>企业电话</span>
                        <span>{{ tradeInfo.telNo }}</span>
                    </div>
                    <div class="row">
                        <span>证件类型</span>
                        <span>{{ tradeInfo.idType | organCertType }}</span>
                    </div>
                    <div class="row">
                        <span>营业执照号</span>
                        <span>{{ tradeInfo.licenceNo }}</span>
                    </div>
                    <div class="row">
                        <span>有效期</span>
                        <span>{{ tradeInfo.licenceExpireDate | formatDate('yyyy-MM-dd') }}</span>
                    </div>
                    <div class="row">
                        <span>税务登记证号</span>
                        <span>{{ tradeInfo.taxRegistrationNo }}</span>
                    </div>
                    <div class="row">
                        <span>组织结构代码证号</span>
                        <span>{{ tradeInfo.organizationNo }}</span>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="title">
                    <span>| 法人信息</span>
                </div>
                <div class="content">
                    <div class="row">
                        <span>法人姓名</span>
                        <span>{{ tradeInfo.corpName }}</span>
                    </div>
                    <div class="row">
                        <span>证件号码</span>
                        <span>{{ tradeInfo.corpIdNo }}</span>
                    </div>
                    <div class="row">
                        <span>有效期</span>
                        <span>{{ tradeInfo.corpIdExpireDate | formatDate('yyyy-MM-dd') }}</span>
                    </div>
                </div>
            </div>
            <div class="section">
                <div class="title">
                    <span>| 银行信息</span>
                </div>
                <div class="content">
                    <div class="row">
                        <span>开户银行</span>
                        <span>{{ tradeInfo.bankName }}</span>
                    </div>
                    <div class="row">
                        <span>开户银行支行分支</span>
                        <span>{{ tradeInfo.branchBankName }}</span>
                    </div>
                    <div class="row">
                        <span>银行户名</span>
                        <span>{{ tradeInfo.acctName }}</span>
                    </div>
                    <div class="row">
                        <span>银行账户</span>
                        <span>{{ tradeInfo.acctNo }}</span>
                    </div>
                </div>
            </div>
            <div class="back">
                <button @click="back">返 回</button>
            </div>
        </div>
        <div class="modify" v-if="pageNo == 3">
            <div class="row">
                <span>旧密码:</span>
                <input id="old-pwd" type="password" placeholder="请输入旧密码">
            </div>
            <div class="row">
                <span>新密码:</span>
                <input id="new-pwd" type="password" placeholder="请输入新密码">
            </div>
            <div class="row">
                <span>确认密码:</span>
                <input id="re-new-pwd" type="password" placeholder="请输入确认密码">
            </div>
            <div class="row">
                <button @click="changePasswd">确 定</button>
                <button @click="back">返 回</button>
            </div>
        </div>
        <div class="feedback" v-if="pageNo == 4">
            <div class="row">
                <em>| 描述</em>
                <span>（欢迎您来参与我们的产品建设，500字以内）</span>
            </div>
            <div class="row">
                <textarea id="feed-detail" placeholder="请输入您的反馈意见"></textarea>
            </div>
            <div class="row">
                <button @click="feedback">提 交</button>
                <button @click="back">返 回</button>
            </div>
        </div>
    </div>
</template>

<script>
    import userService from '../../services/userService'
    import { stringTrim, storageManager } from '../../plugins/utils'
    import config from '../../config'

    export default {
        data () {
            return {
                pageNo: 0,
                pageNum: 0,
                loading: false,
                accountInfo: [],
                recordLength: 0,
                itemList: [
                    {
                        name: '账户信息',
                        className: 'account',
                        imgSrc: require('../../assets/images/account/system/acconut.png')
                    },
                    {
                        name: '企业信息',
                        className: 'company',
                        imgSrc: require('../../assets/images/account/system/company.png')
                    },
                    {
                        name: '修改密码',
                        className: 'modify',
                        imgSrc: require('../../assets/images/account/system/modify.png')
                    },
                    {
                        name: '反馈意见',
                        className: 'feedback',
                        imgSrc: require('../../assets/images/account/system/feedback.png')
                    }
                ]
            }
        },
        watch: {
            pageNo: {
                handler (val) {
                    switch (val) {
                        case 1:
                            let _self = this;
                            _self.fetchAccountRecord(1, true);
                            $(document.body).infinite(50).on("infinite", function () {
                                if (_self.loading) return;
                                _self.loading = true;
                                _self.fetchAccountRecord(_self.pageNum, false);
                            });
                            break;
                        case 2:
                            this.$store.dispatch('fetchTradeInfo');break;
                        default:
                            break;
                    }
                }
            },
            recordLength: {
                handler (val) {
                    if (val < 10 ) {
                        $(document.body).destroyInfinite();
                    }
                },
                deep: true
            }
        },
        computed: {
            tradeInfo () {
                return this.$store.getters.getTradeInfo
            },
        },
        deactivated () {
            $(document.body).destroyInfinite();
        },
        methods: {
            back () {
                this.pageNo = 0;
            },
            fetchAccountRecord (pageNum, refresh) {
                let [data, errCode,_self] = ['', '', this];
                let query = '?pageNo=' + pageNum;
                _self.$http.get(config.ajax._get.allTaAcct + query).then((resp) => {
                    data = resp.body;
                    errCode = data.errCode;
                    if (!errCode) {
                        if (data.data.resultList) {
                            (refresh) ? _self.accountInfo = data.data.resultList : _self.accountInfo = _self.accountInfo.concat(data.data.resultList);
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
            },
            statusHandler (status, type) {
                let statusStr = '';
                switch (status) {
                    case 0:
                        type == 0 ? statusStr = 'pending' : statusStr = '进行中，请稍等...';break;
                    case 1:
                        type == 0 ? statusStr = 'success' : statusStr = '成功！';break;
                    case 2:
                        type == 0 ? statusStr = 'fail' : statusStr = '失败！';break;
                }
                return statusStr;
            },
            changePasswd () {
                let $oldPwd = document.getElementById('old-pwd');
                let $newPwd = document.getElementById('new-pwd');
                let $reNewPwd = document.getElementById('re-new-pwd');
                if (!stringTrim($oldPwd.value)) {
                    $.alert('旧密码不能为空');
                } else if (!stringTrim($newPwd.value)) {
                    $.alert('新密码不能为空');
                } else if (!stringTrim($reNewPwd.value)) {
                    $.alert('新密码不能为空');
                } else if ($newPwd.value !== $reNewPwd.value) {
                    $.alert('两次密码不一致');
                } else {
                    userService.modifyPassword($oldPwd.value, $newPwd.value, this).then(() => {
                        $.toast('密码修改成功', function () {
                            $oldPwd.value = $newPwd.value = $reNewPwd.value = '';
                        });
                    });
                }
            },
            feedback () {
                let [data, errCode, $content] = ['', '', document.getElementById('feed-detail')];
                let orgName = storageManager.getItem(config.session.userKey, true).organName;
                if (!stringTrim($content.value)) {
                    $.alert('反馈内容不能为空');
                } else {
                    userService.feedback(orgName, $content.value, this).then(() => {
                        $.toast('反馈成功', function () {
                            $content.value = '';
                        });
                    });
                }
            },
            exit () {
                this.$store.dispatch('userLogout');
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../../assets/stylesheets/account/system.scss";

    #system {
        .index {
            .item-list {
                .item {
                    .more {
                        background: url(../../assets/images/common/more.png) no-repeat center;
                        background-size: contain;
                    }
                }
            }
        }
        .account {
            .title {
                .back {
                    .icon {
                        background: url(../../assets/images/common/more.png) no-repeat center;
                        background-size: contain;
                        transform: rotate(180deg);
                    }
                }
            }
            .item {
                .bottom {
                    .left {
                        .status {
                            .icon {
                                width: .35rem;
                                height: .35rem;
                                &.pending {
                                    background: url(../../assets/images/account/system/pending.png) no-repeat center;
                                    background-size: 100% 100%;
                                }
                                &.success {
                                    background: url(../../assets/images/account/system/success.png) no-repeat center;
                                    background-size: 100% 100%;
                                }
                                &.fail {
                                    background: url(../../assets/images/account/system/fail.png) no-repeat center;
                                    background-size: 100% 100%;
                                }
                            }
                        }
                    }
                    .right {
                        .type {
                            span {
                                &.cx {
                                    background: url(../../assets/images/account/system/bg_blue.png) no-repeat center;
                                    background-size: 100% 100%;
                                }
                                &.gf {
                                    background: url(../../assets/images/account/system/bg_orange.png) no-repeat center;
                                    background-size: 100% 100%;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>
