<template>
    <div class="product">
        <header class="g-header-container">
            <product-header/>
        </header>
        <me-scroll>
            <!-- 图片来自商品详情统一查询 -->
            <product-slider :data="productImgs"/>
            <!-- <product-info :itemDetail="productDetail"/> -->
            <van-card
              :num='defaultItemSpecs.stock'
              :price='parseFloat(defaultItemSpecs.priceDiscount/100).toFixed(2)'
              :origin-price='parseFloat(defaultItemSpecs.priceNormal/100).toFixed(2)'
              :title='itemMain.itemName'
            >
              <template #tags>
                <van-tag plain type="danger">限购</van-tag>
              </template>
              <template #footer>
                <li class="spec-list" v-for="(spec, index) of itemSpecs" :key="spec.id"  @click="onSpecType(spec.id, index)">
                  <van-button size="mini" :type="(index === selectNum)? 'danger':'default'">{{spec.name}}</van-button>
                </li>
              </template>
            </van-card>
            <!-- 商品详细信息和用户评价 -->
            <van-tabs sticky @click="onUserComments">
              <van-tab title="商品规格">
                  <van-cell title="原产国" :value='itemParam.producPlace' />
                  <van-cell title="产地" :value='itemParam.factoryAddress' />
                  <van-cell title="公司" :value='itemParam.factoryName' />
                  <van-cell title="保质期" :value='itemParam.footPeriod' />
                  <van-cell title="重量" :value='itemParam.weight' />
                  <van-cell title="食用方式" :value='itemParam.eatMethod' />
                  <van-cell title="保存方式" :value='itemParam.storageMethod' />
                  <van-cell title="品牌" :value='itemParam.brand' />
              </van-tab>
              <!-- todo: 用户评论下拉后sticky无效并消失 -->
              <van-tab title="用户评价">
                  <van-empty description="没有评论" v-show='!itemComments.length' />
                  <li v-for="(comment) of itemComments" :key="comment.id">
                    <van-cell center :title='comment.id'>
                      <template #default>
                        <van-rate v-model="comment.commentLevel" readonly />
                      </template>
                      <template #label>
                        {{comment.content}}
                      </template>
                    </van-cell>
                  </li>
              </van-tab>
            </van-tabs>
            <van-divider dashed>没啦</van-divider>
        </me-scroll>
        <div class="g-footer-container">
            <!-- 加入购物车和结算按钮栏 -->
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
    </div>
</template>

<script>
import ProductHeader from './header';
import ProductSlider from './slider';
// import ProductInfo from './productInfo';
// import ProductFooter from './footer';
import MeScroll from '@/base/scroll/index';
import {getProductDetail, getUserComments} from '@/api/requests';
import { Toast } from 'vant';

export default {
    name: 'Product',
    components: {
        ProductHeader,
        ProductSlider,
        // ProductInfo,
        MeScroll,
        // ProductFooter
    },
    data() {
        return {
            // productDetail: {},
            defaultNum: 0,
            productImgs: [],
            itemMain: {},
            itemParam: {},
            itemSpecs: [],
            defaultItemSpecs: {},
            selectNum: 0,
            itemForCart: {},
            itemsForCart: [],
            cartNum: 0,
            itemComments: [],
            tabTitle: ''
        };
    },
    created() {
      //打开页面时加载购物车信息
      this.itemsForCart = this.getInCart();
      this.cartNum = this.itemsForCart.length;
      getProductDetail(this.$route.params.id).then(data => {
          // this.productDetail = data;
          this.productImgs = data.itemImgs;
          this.itemMain = data.item;
          this.itemParam = data.itemParam;
          this.itemSpecs = data.itemSpecs;
          this.defaultItemSpecs = this.itemSpecs[this.defaultNum];
          this.itemForCart = {"itemMain": data.item,"itemImg": data.itemImgs[0],"itemSpec": data.itemSpecs,"selectSpec": 0,"count": 0};
      });
    },
    watch: {
      // 商品规格和用户评论的长度不一样，会影响滚动条的长度，改变其中的值以动态修改长度
      tabTitle() {
          this.itemComments = ['nothing'];
      }
    },
    methods: {
      getInCart(){
        var cartStr = localStorage.getItem("incart");
        if (cartStr){
          return JSON.parse(cartStr);
        }else {
          return [];
        }
      },
      onSpecType(id, index) {
          this.selectNum = index;
          for (let s of this.itemSpecs) {
              if (s.id === id){
                  this.defaultItemSpecs = s;
              }
          }
      },
      onUserComments(name,title) {
          this.tabTitle = title;
          if (title === '用户评价'){
              this._getComments();
          }
          
      },
      async _getComments() {
          const data = await getUserComments(this.itemMain.id);
          if (data){
              this.itemComments = data;
          }
      },
      addCart() {
        // 判断是否重复商品
        var isContains = -1;
        for (let i = 0; i < this.itemsForCart.length; i++) {
          console.log(this.itemsForCart[i].itemSpec[this.itemsForCart[i].selectSpec].id);
          console.log(this.itemSpecs[this.selectNum].id);
          if (this.itemsForCart[i].itemMain.id === this.itemMain.id 
          && this.itemsForCart[i].itemSpec[this.itemsForCart[i].selectSpec].id === this.itemSpecs[this.selectNum].id) {
            isContains = i;
          }
        }
        if (isContains > -1) {
          this.itemsForCart[isContains].count += 1;
        } else {
          this.cartNum += 1;
          this.itemForCart = {"itemMain": this.itemMain,"itemImg": this.productImgs[0],"itemSpec": this.itemSpecs,"selectSpec": this.selectNum,"count": 1};
          // this.itemForCart.selectSpec = this.selectNum;
          // this.itemForCart.count = 1;
          this.itemsForCart.unshift(this.itemForCart);
        }
        localStorage.setItem("incart",JSON.stringify(this.itemsForCart));
        Toast('添加成功！！！');
      },
      onBuyClicked() {
        Toast('买买买！');
      }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins";
    
    .product {
       overflow: hidden;
       position: absolute;
       top: 0;
       left: 0;
       z-index: $product-z-index;
       width: 100%;
       height: 100%;
       background-color: $bgc-theme;
     }
     .spec-list {
         display: inline-block;
     }
     van-divider {
         border-color: #666666;
     }
</style>
