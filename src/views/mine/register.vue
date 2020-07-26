<template>
    <div class="register">
        <van-nav-bar
          title="注册"
          left-arrow
          @click-left="goBack"
        />
        <van-form @submit="onSubmit" class="formplace"> 
            <van-field
                v-model="username"
                name="username"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' },
                         { validator: checkNameExist, message: '该用户名已存在'}]"
            />
            <van-field
                v-model="password"
                type="password"
                name="password"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' },
                         { validator: validLength, message: '密码长度需大于等于6位'}]"
            />
            <van-field
                v-model="confirmpw"
                type="password"
                name="confirmpw"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ validator: samepassword, message: '确认密码与密码不一致' }]"
            />
            <div class="submitBtn">
                <van-button round block type="info" native-type="submit">
                注册
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import { usernameIsExist } from '@/api/requests';
import { userRegister } from '@/api/requests';

export default {
    name: 'Register',
    data() {
        return {
          username: '',
          password: '',
          confirmpw: ''
        };
    },
    methods: {
        goBack() {
          this.$router.back();
        },
        samepassword(){
            return this.password === this.confirmpw;
        },
        async onSubmit(userInfo) {
            //1.发送注册post请求
            let data = await userRegister(userInfo.username,userInfo.password,userInfo.confirmpw);
            //2.保存到vuex
            //3.返回个人中心
            if (data){
                this.$store.dispatch('login', data.username);
                this.goToPage('mine');
            }
        },
        goToPage(name) {
            this.$router.push({name}).catch(err => {err});
        },
        async checkNameExist() {
            //发送用户名检查ajax到后端
            let data = await usernameIsExist(this.username);
            if (data){
                return false;
            }
            return true;
        },
        validLength() {
            return this.password.length >= 6;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../assets/scss/mixins";
    
    .register {
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
