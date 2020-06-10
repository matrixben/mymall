<template>
    <div>
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
            <li v-for="(spec, index) of itemSpecs" :key="spec.id"  @click="onSpecType(spec.id, index)">
              <van-button size="mini" :type="(index === selectNum)? 'danger':'default'">{{spec.name}}</van-button>
            </li>
          </template>
        </van-card>
        
        <van-tabs sticky>
          <van-tab title="商品规格">
              <van-cell title="产地" :value='itemParam.factoryAddress' />
              <van-cell title="公司" :value='itemParam.factoryName' />
              <van-cell title="保质期" :value='itemParam.footPeriod' />
              <van-cell title="重量" :value='itemParam.weight' />
              <van-cell title="食用方式" :value='itemParam.eatMethod' />
              <van-cell title="保存方式" :value='itemParam.storageMethod' />
              <van-cell title="品牌" :value='itemParam.brand' />
          </van-tab>
          <van-tab title="用户评价">内容 2</van-tab>
        </van-tabs>
    </div>
</template>

<script>

export default {
    name: 'ProductInfo',
    props: {
        itemDetail: Object
    },
    watch: {
        itemDetail() {
            // 因为data数据是异步得到再传进来的,所以要监听其变化
            this.itemMain = this.itemDetail.item;
            this.itemParam = this.itemDetail.itemParam;
            this.itemSpecs = this.itemDetail.itemSpecs;
            this.defaultItemSpecs = this.itemSpecs[0];
            console.log(this.itemDetail.itemSpecs);
        }
    },
    data() {
        return {
            itemMain: {},
            itemParam: {},
            itemSpecs: [],
            defaultItemSpecs: {},
            selectNum: 0
        };
    },
    methods: {
        onSpecType(id, index) {
            this.selectNum = index;
            for (let s of this.itemSpecs) {
                if (s.id === id){
                    this.defaultItemSpecs = s;
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .van-col {
        font-size: 15px;
    }
    li {
        display: inline-block;
    }
</style>
