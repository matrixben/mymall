import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {}
    },
    actions: {
        login(ctx, data){
            ctx.commit('login', data);
        },
        changeMobile(ctx, mobile){
            ctx.commit('changeMobile', mobile);
        },
        logout(ctx){
            ctx.commit('logout');
        }
    },
    mutations: {
        login(state, data){
            state.userInfo.username = data.username;
            state.userInfo.mobile = data.mobile;
            state.userInfo.sex = data.sex;
            state.userInfo.email = data.email;
            state.userInfo.nickname = data.nickname;
            
        },
        changeMobile(state, mobile){
            state.userInfo.mobile = mobile;
        },
        logout(state){
            state.userInfo = {}
        }
    }
})