<template>
    <div class="mine">
        <van-nav-bar
          title="个人中心"
          left-text="返回"
          right-text="设置"
          left-arrow
          @click-left="goBack"
          @click-right="goToPage('mysetting')"
        />
        <!-- 参考ddbuy的个人主页样式 -->
        <van-cell-group>
          <van-cell value="个人主页" center 
                    is-link :to="{name:'login'}">
            <template slot="title">
              <!-- 已登录状态 -->
              <div class="personMsg"
                   v-if="token">
                <img class="avatar"
                     :src="user_image.login_icon"
                     alt="头像" />
                <div class="sex"> </div>
                <div class="personInfo">
                  <span class="nickname">用户名</span>
                  <span>手机号</span>
                </div>
              </div>
              <!-- 未登录状态 -->
              <div class="personMsg" v-if="!token">
                <img class="avatar"
                   :src="user_image.noLogin_icon"
                   alt="头像">
                <div class="personInfo">
                  <div @click="goToPage('login')"></div>
                </div>
              </div>
            </template>
          </van-cell>
        </van-cell-group>
        <van-grid>
          <van-grid-item icon="photo-o" text="订单" />
          <van-grid-item icon="photo-o" text="收藏" />
          <van-grid-item icon="photo-o" text="常看" />
          <van-grid-item icon="photo-o" text="最新" />
        </van-grid>
        <van-divider>猜你喜欢</van-divider>
        <!-- 页面跳转时添加动画 -->
        <transition name="router-slider"
                    mode="out-in">
          <router-view></router-view>
        </transition>
    </div>
</template>

<script>

export default {
    name: 'Mine',
    data () {
      return {
        token: false,
        // 头像
        user_image: {
          login_icon: require('@/assets/img/mine/defaultImg.jpeg'),
          noLogin_icon: require('@/assets/img/mine/noLogin.jpg')
        }
      }
    },
    methods: {
        goBack() {
          this.$router.back();
        },
        goToPage(name) {
            this.$router.push({name}).catch(err => {err});
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins";
    
    .mine {
        overflow: hidden;
        width: 100%;
        height: 100%;
        background-color: $bgc-theme;
    }
    
    .personMsg {
        margin-top: 20px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        
        .avatar {
          width: 64px;
          height: 64px;
          border-radius: 50%;
        }
        
        .personInfo {
          display: flex;
          flex-direction: column;
          margin-left: 13px;
        }
        
        .nickname {
            font-size: 18px;
        }
    }
    /*转场动画*/
    .router-slider-enter-active,
    .router-slider-leave-active {
      transition: all 0.3s;
    }
    
    .router-slider-enter,
    .router-slider-leave-active {
      transform: translate3d(2rem, 0, 0);
      opacity: 0;
    }
</style>
