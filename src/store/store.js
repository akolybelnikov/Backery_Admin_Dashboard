import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    state: {
        user: null,
        products: {},
        categories: [],
        news: [],
        offers: [],
        fillings: []
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
            const index = state.products[payload.category].findIndex(
                product => product.productId === payload.item.productId
            )
            state.products[payload.category].splice(index, 1)
            state.products[payload.category].push(payload.item)
        },
        removeProduct(state, payload) {
            const index = state.products[payload.category].findIndex(
                product => product.productId === payload.productId
            )
            state.products[payload.category].splice(index, 1)
        },
        setOffers(state, payload) {
            state.offers = payload.items
        },
        addOffer(state, payload) {
            state.offers.push(payload.item)
        },
        updateOffer(state, payload) {
            const index = state.offers.findIndex(
                offer => offer.id === payload.item.id
            )
            state.offers.splice(index, 1)
            state.offers.push(payload.item)
        },
        removeOffer(state, payload) {
            const index = state.offers.findIndex(
                offer => offer.id === payload.id
            )
            state.offers.splice(index, 1)
        },
        setNews(state, payload) {
            state.news = payload.items
        },
        addNews(state, payload) {
            state.news.push(payload.item)
        },
        updateNews(state, payload) {
            const index = state.news.findIndex(
                news => news.id === payload.item.id
            )
            state.news.splice(index, 1)
            state.news.push(payload.item)
        },
        removeNews(state, payload) {
            const index = state.news.findIndex(news => news.id === payload.id)
            state.news.splice(index, 1)
        },
        setCategories(state, payload) {
            state.categories = payload.items
        },
        addCategory(state, payload) {
            state.categories.push(payload.item)
        },
        updateCategory(state, payload) {
            const index = state.categories.findIndex(
                category => category.name === payload.item.name
            )
            state.categories.splice(index, 1)
            state.categories.push(payload.item)
        },
        removeCategory(state, payload) {
            const index = state.categories.findIndex(
                category => category.name === payload.name
            )
            state.categories.splice(index, 1)
        },
        setFillings(state, payload) {
            state.fillings = payload.items
        },
        addFilling(state, payload) {
            state.fillings.push(payload.item)
        },
        updateFilling(state, payload) {
            const index = state.fillings.findIndex(
                filling => filling.name === payload.item.name
            )
            state.fillings.splice(index, 1)
            state.fillings.push(payload.item)
        },
        removeFilling(state, payload) {
            const index = state.fillings.findIndex(
                filling => filling.name === payload.name
            )
            state.filling.splice(index, 1)
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
        getNews: state => state.news,
        getFillings: state => state.fillings
    }
})

store.subscribe((mutation, state) => {
    if (mutation.type === 'setUser') {
        localStorage.setItem('user', JSON.stringify(state))
    }
})

export default store
