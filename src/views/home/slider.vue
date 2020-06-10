<template>
    <div class="slider-wrapper">
        <me-loading v-if="!sliders.length"></me-loading>
        <!-- 传参给被调用的基本组件 -->
        <me-slider 
            :data="sliders"
            :direction="direction"
            :loop="loop"
            :interval="interval"
            :pagination="pagination"
            v-else>
            <swiper-slide v-for="(item,index) in sliders" :key="index">
                <!-- <a :href="item.linkUrl" class="slider-link"> -->
                <img :src="item.imageUrl" class="slider-img" />
                <!-- </a> -->
            </swiper-slide>
        </me-slider>
    </div>
</template>

<script>
import MeSlider from '@/base/slider/index';
import { swiperSlide } from 'vue-awesome-swiper';
import { sliderOptions } from './config';
import { getHomeSlider } from '@/api/requests';
import MeLoading from '@/base/loading/index';

export default {
    name: 'HomeSlider',
    components: {
        MeSlider,
        swiperSlide,
        MeLoading
    },
    created() {
        //应该增加全局变量或本地缓存保存下载的图片
        this.getSliders();
    },
    methods: {
        async getSliders(){
            let data = await getHomeSlider();
            if (data){
                this.sliders = data;
            }
        }
    },
    data() {
        return {
            direction: sliderOptions.direction,
            loop: sliderOptions.loop,
            interval: sliderOptions.interval,
            pagination: sliderOptions.pagination,
            sliders: []
        };
    }
}
</script>

<style lang="scss" scoped>
    
    .slider-wrapper {
        width: 100%;
        height: 183px;
    }
    .slider-link {
        display: block;
    }
    
    .slider-link,
    .slider-img {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
</style>
