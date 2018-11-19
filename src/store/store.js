import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        user: null,
        products: {},
        categories: [],
        news: [],
        offers: []
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
        },
        addProduct(state, payload) {
            state.products[payload.category].push(payload.item)
        },
        updateProduct(state, payload) {
            const index = state.state.products[payload.category].findIndex(
                product => product.productId === payload.item.productId
            )
            state.products[payload.category].splice(index, 1)
            state.products[payload.category].push(payload.item)
        },
        removeProduct(state, payload) {
            const index = state.state.products[payload.category].findIndex(
                product => product.productId === payload.item.productId
            )
            state.products[payload.category].splice(index, 1)
        },
        setOffers(state, payload) {
            state.offers = payload.items
        },
        setNews(state, payload) {
            state.news = payload.items
        },
        setCategories(state, payload) {
            state.categories = payload.items
        },
        addCategory(state, payload) {
            state.categories.push(payload.item)
        },
        updateCategory(state, payload) {
            const index = state.categories.findIndex(
                category => category.name === payload.name
            )
            state.categories.splice(index, 1)
            state.categories.push(payload.item)
        },
        removeCategory(state, payload) {
            const index = state.categories.findIndex(
                category => category.name === payload.name
            )
            state.categories.splice(index, 1)
        }
    },
    getters: {
        getUser: state => state.user,
        getProductsByCategory: state => category => {
            return state.products.filter(
                product => product.category === category
            )
        },
        getCategories: state => state.categories,
        getOffers: state => state.offers,
        getNews: state => state.news
    }
})

store.subscribe((mutation, state) => {
    if (mutation.type === 'setUser') {
        localStorage.setItem('user', JSON.stringify(state))
    }
})

export default store
