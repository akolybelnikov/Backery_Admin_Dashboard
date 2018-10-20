import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        initializeStore(state) {
            if (localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(
                        state,
                        JSON.parse(localStorage.getItem('store'))
                    )
                )
            }
        }
    },
    getters: {
        getUser: state => {
            return state.user
        }
    }
})

store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
})

export default store
