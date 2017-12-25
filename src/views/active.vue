<template>
    <div class="active-wrap">
        <div class="active"><img src="../assets/images/active/2018.png" alt=""></div>
        <div class="btn">
            <button @click='hideActive()'>进入机构宝</button>
        </div>
    </div>
</template>
<script>
export default {
    name: 'active',
    data() {
        return {
        	active:false
        };
    },
    methods: {
        hideActive() {
            this.$parent.active = 0;
        }
    }
};
</script>
<style lang="scss" scoped>
@import "../assets/stylesheets/define.scss";
.active-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 999;
    background: #fff;
    .active {
        width: 100%;
        height: 100%;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .btn {
        text-align: center;
        position: absolute;
        bottom: 10%;
        left: 50%;
        margin-left: -2.5rem;
        opacity: 0;
        button {
            border: 1px solid $activeColor;
            border-radius: 5px;
            width: 5rem;
            line-height: 1rem;
            color: #ffffff;
            background: $activeColor;
            font-size: .5rem;
        }
    }
}

</style>
