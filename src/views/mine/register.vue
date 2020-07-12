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
                name="用户名"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' },
                         { validator: checkNameExist, message: '该用户名已存在'}]"
            />
            <van-field
                v-model="password"
                type="password"
                name="密码"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-field
                v-model="confirmpw"
                type="password"
                name="确认密码"
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

export default {
    name: 'Register',
    data() {
        return {
          username: '',
          password: '',
          confirmpw: '',
        };
    },
    methods: {
        goBack() {
          this.$router.back();
        },
        samepassword(){
            return this.password === this.confirmpw;
        },
        onSubmit(values) {
          console.log('submit', values);
        },
        async checkNameExist() {
            //发送用户名检查ajax到后端
            let data = await usernameIsExist(this.username);
            if (data){
                return false;
            }
            return true;
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
