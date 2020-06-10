<template>
    <div class="recommend">
        <h3 class="recommend-title">热卖推荐</h3>
        <ul class="recommend-list">
            <li class="recommend-item"
            v-for="(item, index) in recommends" :key="index">
                <router-link class="recommend-link"
                :to="{name: 'home-product', params: {id: item.id}}">
                    <p class="recommend-pic">
                        <img class="recommend-img" v-lazy="item.imageUrl"/>
                    </p>
                    <p class="recommend-name">{{item.itemName}}</p>
                    <p class="recommend-origPrice"><del>￥{{item.priceNormal}}</del></p>
                    <p class="recommend-info">
                        <span class="recommend-price">￥<strong class="recommend-price-num">{{item.priceDiscount}}</strong></span>
                        <span class="recommend-count">{{item.sellCounts}}已售</span>
                    </p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import { getHomeRecommend } from '@/api/requests';
    
export default {
    name: 'HomeRecommend',
    data() {
        return {
            recommends: [],
            curPage: 1,
            totalPage: 1
        };
    },
    created() {
        this.getRecommend();
    },
    methods: {
        async getRecommend() {
            if (this.curPage > this.totalPage){
                return;
            }
            const data = await getHomeRecommend(this.curPage);
            if (data) {
                this.curPage++;
                this.totalPage = data.totalPages;
                this.recommends = this.recommends.concat(data.rows);
                console.log(this.recommends);
                this.$emit('loaded', this.recommends);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins";
    
    .recommend {
        &-title {
            position: relative;
            width: 100%;
            padding: 10px 0;
            font-size: $font-size-l;
            text-align: center;
            
            &:before,
            &:after {
                content: '';
                position: absolute;
                top: 50%;
                width: 40%;
                height: 1px;
                background-color: #ddd;
            }
            &:before {
                left: 0;
            }
            &:after {
                right: 0;
            }
        }
        
        &-list {
            @include flex-between();
            flex-wrap: wrap;
        }
        
        &-item {
            width: 49%;
            background-color: white;
            box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.12);
            margin-bottom: 8px;
        }
        
        &-link {
            display: block;
        }
        // 限定宽度后设置图片为正方形
        &-pic {
            position: relative;
            width: 100%;
            padding-top: 100%;
            margin-bottom: 5px;
        }
        
        &-img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        
        &-name {
            height: 36px;
            padding: 0 5px;
            margin-bottom: 8px;
            line-height: 1.5;
            @include multiline-ellipsis();
        }
        
        &-origPrice {
            padding: 0 5px;
            margin-bottom: 8px;
            color: lightgray;
        }
        
        &-info {
            @include flex-between();
            padding: 0 5px;
            margin-bottom: 8px;
        }
        
        &-price {
            color: red;
        }
        
        &-price-num {
            font-size: 20px;
        }
        
        &-count {
            color: #999;
        }
    }
</style>
