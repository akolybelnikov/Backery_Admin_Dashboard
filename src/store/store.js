import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null,
        products: {}
    },
    mutations: {
        setUser(state, user) {
            state.user = user
        },
        initializeStore(state) {
            if (localStorage.getItem('user')) {
                this.replaceState(
                    Object.assign(
                        state,
                        JSON.parse(localStorage.getItem('user'))
                    )
                )
            }
        },
        setProducts(state, payload) {
            state.products[payload.category] = payload.items
        }
    },
    getters: {
        getUser: state => state.user,
        getProductsByCategory: state => category => {
            return state.products.filter(
                product => product.category === category
            )
        }
    }
})

store.subscribe((mutation, state) => {
    if (mutation.type === 'setUser') {
        localStorage.setItem('user', JSON.stringify(state))
    }
})

export default store
