<template>
    <div class="home">
        <header class="g-header-container">
            <home-header/>
        </header>
        <!-- scrollEnd和base/scroll中的emit对应 -->
        <me-scroll 
          :data="recommends"
          @scroll-end="scrollEnd"
          ref="scroll">
            <home-slider/>
            <home-nav/>
            <!-- 因为热卖推荐里的数据是异步加载，
             所以要在加载完成后通知首页滚动条-->
            <home-recommend @loaded="getRecommends" />
        </me-scroll>
        <div class="g-backtop-container">
            <!-- backtop和base/backtop组件中的emit对应 -->
            <me-backtop :visible="isBacktopVisible" @backtop="backToTop"/>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import HomeHeader from './header';
import HomeSlider from './slider';
import MeScroll from '@/base/scroll/index';
import MeBacktop from '@/base/backtop/index';
import HomeNav from './nav';
import HomeRecommend from './recommend';

export default {
    name: 'Home',
    components: {
        HomeHeader,
        HomeSlider,
        MeScroll,
        MeBacktop,
        HomeNav,
        HomeRecommend
    },
    data() {
        return {
            recommends: [],
            isBacktopVisible: false
        };
    },
    methods: {
        updateScroll() {
            
        },
        getRecommends(recommends){
            this.recommends = recommends;
        },
        scrollEnd(translate, scroll) {
            // 控制何时显示回到顶部按钮
            this.isBacktopVisible = 
                (translate < 0) && (-translate > scroll.height);
        },
        backToTop() {
            this.$refs.scroll && this.$refs.scroll.scrollToTop();
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins";
    
    .home {
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color: $bgc-theme;
    }
</style>
