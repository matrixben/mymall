<template>
    <div class="cart">
        <header class="g-header-container">
            <cart-header/>
        </header>
        <me-scroll>
            <van-checkbox-group v-model="checkresult" ref="checkboxGroup">
                <ul class="cart-list">
                    <li class="cart-item"
                    v-for="(item, index) in cartItems"
                    :key="item.itemId"
                    @click="toggle(index, $event)">
                        <van-checkbox :name="item.itemId" ref="checkboxes" />
                        <van-card
                          :num="item.counts"
                          :price="item.priceDiscount"
                          :origin-price="item.priceNormal"
                          :title="item.itemName"
                          :thumb="item.itemImgUrl"
                        >
                          <template #tags>
                            <van-tag plain type="danger">{{item.specName}}</van-tag>
                          </template>
                          <template #footer>
                            <van-stepper v-model="item.counts" @change="calTotPrice" />
                          </template>
                        </van-card>
                    </li>
                </ul>
            </van-checkbox-group>
            
        </me-scroll>
        <!-- 总金额和结算按钮栏 -->
        <van-goods-action class="submitBtn">
          <van-checkbox v-model="isAllChecked" @click="checkAll" />
          <span>￥{{cartTotPrice}}</span>
          <van-goods-action-button
            type="danger"
            text="立即购买"
            @click="onBuyClicked"
          />
        </van-goods-action>
        <router-view></router-view>
    </div>
</template>

<script>
import CartHeader from './header';
import {showItemsInCart} from '@/api/requests';
import MeScroll from '@/base/scroll/index';

export default {
    name: 'Cart',
    components: {
        CartHeader,
        MeScroll
    },
    data() {
        return {
            cartItems: [],
            cartTotPrice: 0,
            checkresult: [],
            isAllChecked: false
        };
    },
    created() {
        this.getCartItems('jason001');
    },
    methods: {
        async getCartItems(userId) {
            const data = await showItemsInCart(userId);
            if (data){
                this.cartItems = data;
            }
        },
        calTotPrice() {
            let totPrice = 0;
            for (let item of this.checkresult) {
                console.log(item);
                totPrice += item.counts * item.priceDiscount;
            }
            this.cartTotPrice = totPrice;
        },
        toggle(index, e) {
            if (e.target.nodeName === 'I'){
                this.$refs.checkboxes[index].toggle();
            }
            //this.calTotPrice();
        },
        checkAll(){
            this.$refs.checkboxGroup.toggleAll();
            //计算总金额并显示
        },
        onBuyClicked(){}
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins";
    
    .cart {
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color: $bgc-theme;
    }
    
    .submitBtn {
        position: absolute;
        z-index: $backtop-z-index;
        width: 100%;
        left: 0;
        bottom: $tabbar-height;
    }
</style>
