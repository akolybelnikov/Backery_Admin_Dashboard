import Vue from 'vue'
import Vuex from 'vuex'

// import { products } from './products.module'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null,
        products: {},
        createdProduct: null,
        loading: false
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
        },
        setCreatedProduct(state, product) {
            state.createdProduct = product
        },
        setLoading(state, loading) {
            state.loading = loading
        }
    },
    getters: {
        getUser: state => state.user,
        getProductsByCategory: state => category => {
            return state.products.filter(
                product => product.category === category
            )
        },
        getCreatedProduct: state => state.createdProduct
    }
})

store.subscribe((mutation, state) => {
    localStorage.setItem('store', JSON.stringify(state))
})

export default store
