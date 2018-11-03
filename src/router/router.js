import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import ProductForm from '../products/components/ProductForm.vue'
import ProductCreated from '../products/components/ProductCreated.vue'
import Products from '../products/components/Products.vue'
import ProductsCategory from '../products/components/ProductsCategory.vue'
import OfferForm from '../components/OfferForm.vue'
import NewsForm from '../components/NewsForm.vue'
import CategoryForm from '../components/CategoryForm.vue'
import { AmplifyEventBus, AmplifyPlugin } from 'aws-amplify-vue'
import * as AmplifyModules from 'aws-amplify'
import store from '../store/store'
import Login from '../views/Login.vue'

Vue.use(Router)
Vue.use(AmplifyPlugin, AmplifyModules)

let user

AmplifyEventBus.$on('authState', async state => {
    if (state === 'signedOut') {
        user = null
        store.commit('setUser', null)
        router.push({ path: '/auth' })
    } else if (state === 'signedIn') {
        router.push({ path: '/' })
    }
})

function getUser() {
    return Vue.prototype.$Amplify.Auth.currentAuthenticatedUser()
        .then(data => {
            if (data && data.signInUserSession) {
                return data
            }
        })
        .catch(() => {
            store.commit('setUser', null)
            return null
        })
}

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard,
            meta: {
                requiresAuth: true
            },
            children: [
                {
                    path: 'create-product',
                    name: 'ProductForm',
                    component: ProductForm,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'product-created',
                    name: 'ProductCreated',
                    component: ProductCreated,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'create-offer',
                    name: 'OfferForm',
                    component: OfferForm,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'create-news',
                    name: 'NewsForm',
                    component: NewsForm,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'create-category',
                    name: 'CategoryForm',
                    component: CategoryForm,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'update-product/:id',
                    name: 'UpdateProduct',
                    component: ProductForm,
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'products-list',
                    name: 'ProductsList',
                    component: Products,
                    meta: {
                        requiresAuth: true
                    },
                    children: [
                        {
                            path: ':category',
                            name: 'ProductsCategory',
                            component: ProductsCategory,
                            meta: {
                                requiresAuth: true
                            }
                        }
                    ]
                }
            ]
        },
        // {
        //     path: '/products',
        //     name: 'Products',
        //     component: () =>
        //         import(/* webpackChunkName: "products" */
        //         '../products/components/Products.vue'),
        //     meta: {
        //         requiresAuth: true
        //     }
        // },
        {
            path: '/auth',
            name: 'Login',
            component: Login
        }
    ]
})

router.beforeResolve(async (to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        user = await getUser()
        if (!user) {
            return next({
                path: 'auth',
                query: {
                    redirect: to.fullPath
                }
            })
        }
        return next()
    }
    return next()
})

export default router
