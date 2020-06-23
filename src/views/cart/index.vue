<template>
    <div class="cart">
        <header class="g-header-container">
            <cart-header/>
        </header>
        <me-scroll class="content-scroll">
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
        <van-goods-action class="orderBtn">
          <van-checkbox v-model="isAllChecked" @click="checkAll(isAllChecked)">
              全选
          </van-checkbox>
          <span class="totalPrice">￥{{ calTotPrice() }}</span>
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
        calTotPrice: function() {
            let totPrice = 0;
            for(var i=0; i < this.cartItems.length; i++){
                if (this.checkresult.indexOf(this.cartItems[i].itemId) > -1){
                    totPrice += parseInt(this.cartItems[i].priceDiscount) * parseInt(this.cartItems[i].counts);
                }
            }
            return totPrice;
        },
        toggle(index, e) {
            //只有点击选择框才选中此商品
            if (e.target.nodeName === 'I'){
                this.$refs.checkboxes[index].toggle();
            }
        },
        checkAll(ac){
            this.$refs.checkboxGroup.toggleAll(ac);
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
    
    .content-scroll {
        top: $navbar-height;
    }
    
    .orderBtn {
        position: absolute;
        z-index: $backtop-z-index;
        width: 100%;
        left: 0;
        bottom: $tabbar-height;
    }
    
    .totalPrice {
        font-size: 25px;
        margin-left: 12px;
        margin-right: 12px;
    }
</style>
