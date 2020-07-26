import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        userInfo: {}
    },
    actions: {
        login(ctx, username){
            ctx.commit('login', username);
        },
        changeMobile(ctx, mobile){
            ctx.commit('changeMobile', mobile);
        },
        logout(ctx){
            ctx.commit('logout');
        }
    },
    mutations: {
        login(state, username){
            state.userInfo.username = username;
        },
        changeMobile(state, mobile){
            state.userInfo.mobile = mobile;
        },
        logout(state){
            state.userInfo = {}
        }
    }
})