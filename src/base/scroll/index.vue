<template>
    <swiper :options="swiperOption" ref="swiper">
        <swiper-slide>
            <slot></slot>
        </swiper-slide>
        <div class="swiper-scrollbar" v-if="scrollbar" slot="scrollbar"></div>
    </swiper>
</template>

<script>
import {swiper, swiperSlide} from 'vue-awesome-swiper';

export default {
    name: 'MeScroll',
    components: {
        swiper,
        swiperSlide
    },
    props: {
        scrollbar: {
            type: Boolean,
            default: true
        },
        asyncData: {
            type: [Array, Object]
        }
    },
    data(){
        return {
            swiperOption: {
                direction: 'vertical',
                slidesPerView: 'auto',
                freeMode: true,
                setWrapperSize: true,
                scrollbar: {
                    el: this.scrollbar ? '.swiper-scrollbar':null,
                    hide: true
                },
                on: {
                    slideMove: this.scroll,
                    touchEnd: this.touchEnd,
                    transitionEnd: this.scrollEnd
                }
            }
        };
    },
    watch: {
        asyncData() {
            this.update();
        }
    },
    methods: {
        update() {
            this.$refs.swiper && this.$refs.swiper.update();
        },
        scrollEnd() {
            const swiper = this.$refs.swiper.swiper;
            this.$emit('scroll-end', swiper.translate, swiper);
        },
        scrollToTop(speed, runCallBacks) {
            this.$refs.swiper && this.$refs.swiper.swiper.slideTo(0, speed, runCallBacks);
        }
    }
}
</script>

<style lang="scss" scoped>
    .swiper-container {
        overflow: hidden;
        width: 100%;
        height: 100%;
    }
    
    .swiper-slide {
        height: auto;
    }
</style>
