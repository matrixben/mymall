<template>
  <div id="app" class="g-container">
      <div class="g-view-container">
          <router-view></router-view>
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
        }
    }
</script>
