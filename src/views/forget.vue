<template>
    <div id="forget">
        <div class="title">
            <span>找回密码</span>
        </div>
        <div class="forget-form">
            <div class="row">
                <span>手机号码:</span>
                <input id="mobile" type="tel" placeholder="您的手机号码">
                <span class="need">*</span>
            </div>
            <div class="row">
                <span>图片验证:</span>
                <input id="captcha" type="text" placeholder="请输入验证码">
                <img class="captcha" src="/jgb-web/v1/captcha" @click="changeCaptcha">
                <span class="need">*</span>
            </div>
            <div class="row">
                <span>手机验证码:</span>
                <input id="sms" type="tel" placeholder="请输入验证码">
                <button class="sms" @click="sendSms($event)">点击获取</button>
                <span class="need">*</span>
            </div>
            <div class="row">
                <span>设置密码:</span>
                <input id="password" type="password" placeholder="6~10位数字" @input="complexCheck($event)">
                <span class="need">*</span>
            </div>
            <div class="row">
                <div id="fzd">
                    <ul>
                        <li>低</li>
                        <li>中</li>
                        <li>高</li>
                    </ul>
                </div>
            </div>
            <div class="row">
                <span>确认密码:</span>
                <input id="verify-pwd" type="password" placeholder="6~10位数字">
                <span class="need">*</span>
            </div>
            <div class="row">
                <button class="submit" @click="submit">完 成</button>
                <button class="back" @click="back">返 回</button>
            </div>
        </div>
    </div>
</template>

<script>
    import userService from '../services/userService'
    import commonService from '../services/commonService'
    import { stringTrim } from '../plugins/utils'

    export default {
        data () {
            return {
                time: 60
            }
        },
        methods: {
            changeCaptcha () {
                let captcha = document.querySelector('.captcha');
                let src = '/jgb-web/v1/captcha?v=';
                let time = new Date().getTime();
                captcha.src = src + time;
            },
            complexCheck (e) {
                let value = e.target.value;
                let $dom = document.getElementById('fzd');
                if (value.length == 0) {
                    $dom.className = '';
                } else if (value.length > 0 && value.length <= 6) {
                    $dom.className = 'weak';
                } else if (value.length > 6 && value.length <= 8) {
                    $dom.className = 'middle';
                } else if (value.length > 8) {
                    $dom.className = 'strong';
                }
            },
            sendSms (e) {
                let _self = this;
                let $mobileNo = document.getElementById('mobile');
                if (!stringTrim($mobileNo.value)) {
                    $.alert('手机号码不能为空');
                } else {
                    commonService.sendSms($mobileNo.value, _self).then(() => {
                        _self.countDown(e.target);
                    });
                }
            },
            countDown (dom) {
                let _self = this;
                if (_self.time == 0) {
                    dom.removeAttribute('disabled');
                    dom.innerText = '点击获取';
                    _self.time = 60;
                    return;
                } else {
                    dom.setAttribute('disabled', true);
                    dom.innerText = '（' + _self.time + '）';
                    _self.time--;
                }
                setTimeout(function () {
                    _self.countDown(dom);
                }, 1000);
            },
            submit () {
                let _self = this;
                let $mobileNo = document.getElementById('mobile');
                let $captcha = document.getElementById('captcha');
                let $smscode = document.getElementById('sms');
                let $password = document.getElementById('password');
                let $verify = document.getElementById('verify-pwd');
                if (!stringTrim($mobileNo.value)) {
                    $.alert('手机号码不能为空');
                } else if (!stringTrim($captcha.value)) {
                    $.alert('图片验证码不能为空');
                } else if (!stringTrim($smscode.value)) {
                    $.alert('短信验证码不能为空');
                } else if (!stringTrim($password.value)) {
                    $.alert('密码不能为空');
                } else if (!stringTrim($verify.value)) {
                    $.alert('确认密码不能为空');
                } else if ($password.value!= $verify.value) {
                    $.alert('两次密码不一致');
                } else {
                    userService.forgetPassword($mobileNo.value, $captcha.value, $smscode.value, $password.value, _self).then(() => {
                        $.toast('修改成功，请重新登陆！', function () {
                            _self.$router.push({ name: 'index' });
                        });
                    });
                }
            },
            back () {
                this.$router.push({ name: 'index' });
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/stylesheets/forget.scss";
</style>
