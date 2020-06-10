<template>
    <me-navbar class="header">
        <i class="iconfont icon-scan" slot="left"></i>
        <me-search-box
          placeholder="这里是搜索框"
          slot="center"
          fake
          @query="getQuery"
          @click.native="goToSearch"
        />
        <i class="iconfont icon-msg" slot="right"></i>
    </me-navbar>
</template>

<script>
import MeNavbar from '@/base/navbar/index';
import MeSearchBox from '@/base/search-box/index';

export default {
    name: 'HomeHeader',
    components: {
        MeNavbar,
        MeSearchBox
    },
    methods: {
        getQuery(query) {
            console.log(query);
        },
        goToSearch() {
            this.$router.push('/search');
        }
    }
}
</script>

<style lang="scss" scoped>
    @import  "../../assets/scss/mixins";
    
    .header {
        &.mine-navbar {
            background-color: transparent;
        }
        
        .iconfont {
            color: $icon-color-default;
            font-size: $icon-font-size;
        }
    }
</style>
