<template>
  <div id="app" class="g-container">
      <div class="g-view-container">
          <router-view v-if="isRouterAlive"></router-view>
      </div>
      <div class="g-footer-container">
          <!-- 因为html标签不区分大小写，所以vue中驼峰法命名的组件使用-分隔 -->
          <c-tabbar/>
      </div>
  </div>
</template>

<script>
    import CTabbar from './components/tabbar';
    
    export default {
        name: 'App',
        components: {
            CTabbar
        },
        data() {
            return {
                isRouterAlive: true
            };
        },
        provide() {
            return {
                reload: this.reload
            };
        },
        methods: {
            reload() {
                this.isRouterAlive = false;
                this.$nextTick(function() {
                    this.isRouterAlive = true;
                });
            }
        }
    }
</script>
