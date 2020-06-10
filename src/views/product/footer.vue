<template>
    <div>
        <van-goods-action>
          <van-goods-action-icon icon="cart-o" text="购物车"
           to="/cart" :badge="cartNum" />
          <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="addCart"
          />
          <van-goods-action-button
            type="danger"
            text="立即购买"
            @click="onBuyClicked"
          />
        </van-goods-action>
    </div>
</template>

<script>
import { Toast } from 'vant';

export default {
    name: 'ProductFooter',
    data() {
        return {
          cartNum: 0
        };
    },
    methods: {
        // 加入购物车默认只选一件商品,结算时再选数量
        addCart() {
          // 判断是否重复商品
          this.cartNum++;
          Toast('添加成功！');
        },
        onBuyClicked() {
          Toast('买买买！');
        }
    }
}

</script>

<style lang="scss" scoped>
</style>
