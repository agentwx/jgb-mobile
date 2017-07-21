<template>
    <div id="main" :class='{mainActive:popping,height:heightCls}'>
        <transition name="router">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
    	data(){
    		return {
               popping:false,
               heightCls:false
    		}
    	}
    }
</script>

<style lang="scss">
    @import "assets/stylesheets/global";
</style>
