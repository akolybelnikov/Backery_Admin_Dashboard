import Vue from 'vue'
import {
    listFillings,
    listCategories,
    listOffers,
    listNews,
    listProducts
} from '../../graphql/queries'

async function getFillings() {
    const result = await Vue.prototype.$Amplify.API.graphql(
        Vue.prototype.$Amplify.graphqlOperation(listFillings, {})
    )
    return result.data.listFillings.items
}

async function getCategories() {
    const result = await Vue.prototype.$Amplify.API.graphql(
        Vue.prototype.$Amplify.graphqlOperation(listCategories, {})
    )
    return result.data.listCategories.items
}

async function getOffers() {
    const result = await Vue.prototype.$Amplify.API.graphql(
        Vue.prototype.$Amplify.graphqlOperation(listOffers, {})
    )
    return result.data.listOffers.items
}

async function getNews() {
    const result = await Vue.prototype.$Amplify.API.graphql(
        Vue.prototype.$Amplify.graphqlOperation(listNews, {})
    )
    return result.data.listNews.items
}

async function getProducts(category) {
    const result = await Vue.prototype.$Amplify.API.graphql(
        Vue.prototype.$Amplify.graphqlOperation(listProducts, {
            filter: { category: { eq: category } },
            limit: 250,
            nt: null
        })
    )
    return result.data.listProducts.items
}

export { getFillings, getOffers, getProducts, getNews, getCategories }
