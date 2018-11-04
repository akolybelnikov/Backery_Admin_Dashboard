import Vue from 'vue'
import Vuex from 'vuex'

// import { products } from './products.module'

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
            if (localStorage.getItem('store')) {
                this.replaceState(
                    Object.assign(
                        state,
                        JSON.parse(localStorage.getItem('store'))
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
    localStorage.setItem('store', JSON.stringify(state))
})

export default store
