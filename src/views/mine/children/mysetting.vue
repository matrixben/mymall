<template>
    <div class="mysetting">
        <van-nav-bar
          title="设置"
          left-arrow
          @click-left="goBack"
        />
        <van-cell-group class="cellgroup">
          <van-cell center title="标题1">
            <template #right-icon>
              <van-switch v-model="one" size="24" />
            </template>
          </van-cell>
          <van-cell center title="标题2">
            <template #right-icon>
              <van-switch v-model="two" size="24" />
            </template>
          </van-cell>
          <van-cell center title="标题3">
            <template #right-icon>
              <van-switch v-model="three" size="24" />
            </template>
          </van-cell>
          <van-cell title="单元格4" is-link />
          <van-cell title="单元格5" label="描述随子页面修改而变化" is-link />
        </van-cell-group>
        
        <van-button color="red" hairline plain block @click="logout">退出登录</van-button>
    </div>
</template>

<script>
export default {
    name: 'MySetting',
    inject: ['reload'],
    data() {
        return {
            one: true,
            two: false,
            three: false
        }
    },
    methods: {
        goBack() {
          this.$router.back();
        },
        logout(){
            console.log('quit');
            localStorage.setItem("mymall_token", this.$store.state.userInfo.username);
            this.$store.dispatch('logout');
            this.reload();
            this.goBack();
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/scss/mixins";
    
    .mysetting {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: $product-z-index;
        width: 100%;
        height: 100%;
        background-color: $bgc-theme;
        
        .van-nav-bar {
            margin-bottom: 20px;
        }
        
        .cellgroup {
            margin-bottom: 20px;
        }
    }
</style>
