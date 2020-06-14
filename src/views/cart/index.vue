<template>
    <div class="cart">
        <header class="g-header-container">
            <cart-header/>
        </header>
        <div class="g-content-container">
            <van-checkbox-group v-model="checkresult">
                <ul class="cart-list">
                    <li class="cart-item"
                    v-for="(item, index) in cartItems"
                    :key="item.itemId"
                    @click="toggle(index)">
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
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
import CartHeader from './header';
import {showItemsInCart} from '@/api/requests';

export default {
    name: 'Cart',
    components: {
        CartHeader,
    },
    data() {
        return {
            cartItems: [],
            cartTotPrice: 0,
            checkresult: []
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
                totPrice += item.counts * item.priceDiscount;
            }
            this.cartTotPrice = totPrice;
        },
        toggle(index) {
            this.$refs.checkboxes[index].toggle();
            //this.calTotPrice();
        }
    }
}
</script>

<style>
</style>
