<template>
    <div class="login">
        <van-nav-bar
          title="登录"
          left-text="返回"
          right-text="注册"
          left-arrow
          @click-left="goBack"
          @click-right="goToPage('register')"
        />
        <van-form @submit="onSubmit" class="formplace"> 
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div class="submitBtn">
                <van-button round block type="info" native-type="submit">
                登录
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { userLogin } from '@/api/requests';

export default {
    name: 'Login',
    data() {
        return {
          username: '',
          password: '',
        };
    },
    methods: {
        goBack() {
          this.$router.back();
        },
        goToPage(name) {
            this.$router.push({name}).catch(err => {err});
        },
        async onSubmit(userInfo) {
            //1.发送登录请求
            let data = await userLogin(userInfo.username, userInfo.password);
            //2.保存用户信息到vuex
            //3.跳转到个人主页
            if (data){
                //待解决返回页面未刷新问题
                this.$store.dispatch('login', data.username);
                this.goToPage('mine');
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins";
    
    .login {
        overflow: hidden;
        position: absolute;
        top: 0;
        left: 0;
        z-index: $product-z-index;
        width: 100%;
        height: 100%;
        background-color: $bgc-theme;
    }

    .formplace {
        margin-top: 20px;
    }

    .submitBtn {
        margin: 16px;
    }
</style>
