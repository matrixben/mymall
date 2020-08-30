<template>
    <div class="login">
        <van-nav-bar
          title="登录"
          left-text="返回"
          right-text="注册"
          left-arrow
          @click-left="goBack"
          @click-right="goToPageWithoutHistory('register')"
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
    inject: ['reload'],
    data() {
        return {
          username: '',
          password: '',
        };
    },
    created(){
        var name = localStorage.getItem("mymall_token");
        if (typeof name === 'string' && name !== 'undefined'){
            this.username = localStorage.getItem("mymall_token");
        }
    },
    methods: {
        goBack() {
          this.$router.back();
        },
        goToPage(name) {
            this.$router.push({name}).catch(err => {err});
        },
        goToPageWithoutHistory(name) {
            this.$router.replace({name}).catch(err => {err});
        },
        async onSubmit(userInfo) {
            //1.发送登录请求
            //登录成功后返回两部分信息：用户简略信息和token加密字符串，前者保存在vue的store，后者保存在localstorage
            //每次打开主页时使用token请求用户信息
            let data = await userLogin(userInfo.username, userInfo.password);
            if (data){
                //2.保存用户信息到vuex
                this.$store.dispatch('login', data);
                //3.保存用户信息到localstorage,这里应该保存加密的字符串
                localStorage.setItem("mymall_token", JSON.stringify(data));
                //4.刷新页面为最新数据
                this.reload();
                //5.跳转到个人主页，不使用push就不会将登录页放入历史记录
                this.goToPageWithoutHistory('mine');
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
