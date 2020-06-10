<template>
  <div class="hot">
    <h4 class="hot-title">热门搜索</h4>
    <div class="loading-container" v-if="!hots.length">
      <me-loading/>
    </div>
    <ul class="hot-list" v-else>
      <li class="hot-item"
          v-for="(item, index) in hots" :key="index"
          @click="$_selectItem(item.hotWord)"
      >{{ item.hotWords}}</li>
    </ul>
  </div>
</template>

<script>
  import MeLoading from '@/base/loading/index';
  import {getSearchHotKeyword} from '@/api/requests';
  import {searchMixin} from '@/assets/js/mixins';
  // import storage from '../../assets/js/storage.js';
  // import {SEARCH_HISTORY_KEYWORD_KEY} from './config';

  export default {
    name: 'SearchHot',
    components: {
      MeLoading
    },
    mixins: [searchMixin],
    data() {
        return {
            hots: []
        }
    },
    created() {
        this.getHotKeyword().then(() => {
            // 因为热门搜索的数据是异步查询,所以要在加载完成后告诉搜索页更新滚动条
            this.$emit('loaded');
        });
    },
    methods: {
        getHotKeyword() {
            return getSearchHotKeyword().then(data => {
                return new Promise(resolve => {
                    if (data){
                        this.hots = data;
                        resolve();
                    }
                });
            });
        }
    }
  };
</script>

<style lang="scss" scoped>
  @import "../../assets/scss/mixins";

  .hot {
    padding-left: 10px;
    background-color: #fff;
    border-bottom: 1px solid $border-color;
    margin-bottom: 10px;

    &-title {
      height: 34px;
      line-height: 34px;
      font-size: $font-size-l;
      font-weight: bold;
    }

    &-list {
      display: flex;
      flex-wrap: wrap;
    }

    &-item {
      padding: 8px;
      background-color: #f0f2f5;
      border-radius: 4px;
      margin: 0 10px 10px 0;
      color: #686868;
    }
  }

  .loading-container {
    padding: 10px 0;
  }
</style>
