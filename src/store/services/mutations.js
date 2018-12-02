import Vue from 'vue'
import {
    createProduct,
    createNews,
    createCategory,
    createOffer,
    createFilling
} from '../../graphql/mutations'

async function persistProduct() {
    const result = await Vue.prototype.$Amplify.API.graphql(
        Vue.prototype.$Amplify.graphqlOperation(createProduct, {})
    )
    return result.data.listFillings.items
}

async function persistCategory() {
    const result = await Vue.prototype.$Amplify.API.graphql(
        Vue.prototype.$Amplify.graphqlOperation(createCategory, {})
    )
    return result.data.listCategories.items
}

async function persistOffer() {
    const result = await Vue.prototype.$Amplify.API.graphql(
        Vue.prototype.$Amplify.graphqlOperation(createOffer, {})
    )
    return result.data.listFillings.items
}

async function persistNews() {
    const result = await Vue.prototype.$Amplify.API.graphql(
        Vue.prototype.$Amplify.graphqlOperation(createNews, {})
    )
    return result.data.listCategories.items
}

async function persistFilling() {
    const result = await Vue.prototype.$Amplify.API.graphql(
        Vue.prototype.$Amplify.graphqlOperation(createFilling, {})
    )
    return result.data.listFillings.items
}

export {
    persistCategory,
    persistFilling,
    persistNews,
    persistOffer,
    persistProduct
}
