<template>
    <div class="g-tabbar">
        <!-- tabbar底部导航栏组件 -->
        <router-link class="g-tabbar-item" to="/home">
            <i class="iconfont icon-home"></i>
            <span>首页</span>
        </router-link>
        <router-link class="g-tabbar-item" to="/category">
            <i class="iconfont icon-category"></i>
            <span>分类</span>
        </router-link>
        <router-link class="g-tabbar-item" to="/cart">
            <i class="iconfont icon-cart"></i>
            <span>购物车</span>
        </router-link>
        <router-link class="g-tabbar-item" to="/mine">
            <i class="iconfont icon-mine"></i>
            <span>我的</span>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'CTabbar'
}
</script>

<style lang="scss">
    @import "../../assets/scss/mixins";
    
    .router-link-active {
        color: $link-active-color;
    }
</style>
