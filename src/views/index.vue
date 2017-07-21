<template>
    <div class="bg">
        <c-active v-if='active'></c-active>
        <div id="index">
            <div class="brand">
                <img class="logo" src="../assets/images/index/logo.png" alt="">
                <p>对接持牌资产管理公司优质资产</p>
                <p>为机构理财助力</p>
            </div>
            <div class="login-form" v-if="pageNo == 0">
                <div class="row">
                    <input id="username" type="tel" placeholder="请输入您的账号">
                </div>
                <div class="row">
                    <input v-show='!eye' id="password" type="password" placeholder="请输入您的密码" v-model="pwd">
                    <input v-show='eye' id="password" type="text" placeholder="请输入您的密码" v-model="pwd">
                    <span class="eye" @click='pwdToggle'><img  v-show='!eye'  src="../assets/images/index/eye-close.png" >
                <img v-show='eye' src="../assets/images/index/eye-open.png" ></span>
                </div>
                <div class="row">
                    <router-link :to="{ name: 'forget' }" tag="span" class="forget">忘记密码</router-link>
                </div>
                <div class="row">
                    <button class="login" @click="login">登 录</button>
                </div>
                <div class="row">
                    <span>
                    没有账号？
                    <router-link :to="{ name: 'register' }" tag="em">立即注册</router-link>
                </span>
                </div>
            </div>
            <div class="in-progress-tips" v-if="pageNo == 1">
                <span>我们已收到注册请求，会有运营人员与您进行沟通！</span>
            </div>
        </div>
    </div>
</template>
<script>
import {
    stringTrim,
    getUrlParam,
    storageManager
} from '../plugins/utils'
import config from '../config'
import cActive from './active'

export default {
    components: {
        cActive
    },
    data() {
        const date = new Date();
        const abortTime = new Date('2017-05-02');
        const newTime=abortTime.getTime()-8*3600;
        return {
            pageNo: 0,
            eye: false,
            pwd: '',
            active: date.getTime() < newTime ? true : false
        }
    },

    beforeMount() {
        if (storageManager.getItem(config.session.loginKey)) {
            this.$router.push({
                name: 'account'
            });
        } else if (getUrlParam('verify')) {
            this.pageNo = 1;
        }
    },
    mounted() {
        let _this = this;
        _this.$root.heightCls=true;
        setTimeout(function() {
            _this.active = 0
        }, 4000)
    },
    methods: {
        login() {
            let username = document.getElementById('username').value;
            let password = document.getElementById('password').value;
            if (!stringTrim(username)) {
                $.alert('用户名不能为空');
            } else if (!stringTrim(password)) {
                $.alert('密码不能为空');
            } else {
                let payload = {
                    username,
                    password,
                    instance: this
                }
                this.$store.dispatch('userLogin', payload);
            }
        },
        pwdToggle() {
            this.eye = !this.eye
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/stylesheets/index";
.bg {
    width: 100%;
    min-height: 100%;
    background: url('../assets/images/index/bg.jpg') 100% 100%;
    background-size: cover;
    position: relative;
    &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #fff;
        opacity: .8;
        z-index: 1;
    }
}

</style>
