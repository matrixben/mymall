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
                <img :src="item.url" class="slider-img" />
                <!-- </a> -->
            </swiper-slide>
        </me-slider>
    </div>
</template>

<script>
import MeSlider from '@/base/slider/index';
import { swiperSlide } from 'vue-awesome-swiper';
import { sliderOptions } from './config';
import MeLoading from '@/base/loading/index';

export default {
    name: 'ProductSlider',
    components: {
        MeSlider,
        swiperSlide,
        MeLoading
    },
    props: {
        data: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    watch: {
        data() {
            // 因为data数据是异步得到再传进来的,所以要监听其变化
            this.sliders = this.data;
        }
    },
    data() {
        return {
            direction: sliderOptions.direction,
            loop: sliderOptions.loop,
            interval: sliderOptions.interval,
            pagination: sliderOptions.pagination,
            sliders: this.data
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
