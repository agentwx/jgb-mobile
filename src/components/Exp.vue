<template>
    <div id="exp">
        <div class="row title">
            <span>爱心值</span>
        </div>
            <div class="row">
                <div class="block">
                    <span>我的爱心值</span>
                </div>
                <div class="block">
                    <strong>{{ point.totalPoint | thousands }}</strong>
                </div>
            </div>
            <div class="row">
                <div class="block">
                    <span>可用爱心值</span>
                </div>
                <div class="block">
                    <span>{{ point.availPoint | thousands }}</span>
                </div>
            </div>
            <div class="row">
                <div class="block">
                    <span>在途爱心值</span>
                    <span>(<em>{{ point.availDate | formatDate('MM月dd日') }}</em>可用)</span>
                </div>
                <div class="block">
                    <span>{{ point.frozePoint | thousands }}</span>
                </div>
            </div>
    </div>
</template>

<script>
    export default {
        computed: {
            point () {
                return this.$store.getters.getPoint
            }
        },
        beforeMount () {
            this.$store.dispatch('fetchPoint');
        }
    }
</script>

<style lang="scss" scoped>
    #exp {
        margin: 0 .2rem;
        background-color: #fff;
        border: 1px solid #ddd;
        border-top-color: #008fe6;
        border-radius: .1rem;
        .row {
            display: flex;
            align-items: center;
            padding: .2rem .2rem;
            border-bottom: 1px dotted #ddd;
            &.title {
                background-color: #1b65ce;
                text-align: center;
                justify-content: center;
                border-bottom: none;
                span {
                    color: #fff;
                    font-size: .45rem;
                }
            }
            .block {
                strong {
                    font-size: .6rem;
                    color: #1b65ce;
                }
                &:first-child {
                    width: 3rem;
                    span {
                        display: block;
                        &:first-child {
                            font-size: .4rem;
                        }
                        &:nth-child(2) {
                            font-size: .3rem;
                            em {
                                color: #1b65ce;
                            }
                        }
                    }
                }
                &:last-child {
                    span {
                        font-size: .5rem;
                        color: #000;
                    }
                }
            }
            &:last-child {
                border: none;
            }
        }
    }
</style>
