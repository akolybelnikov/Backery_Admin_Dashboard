import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../components/Dashboard.vue'
import ProductForm from '../components/ProductForm.vue'
import OfferForm from '../components/OfferForm.vue'
import NewsForm from '../components/NewsForm.vue'
import CategoryForm from '../components/CategoryForm.vue'
import { AmplifyEventBus, AmplifyPlugin } from 'aws-amplify-vue'
import * as AmplifyModules from 'aws-amplify'
import store from '../store/store'
import Login from '../components/Login.vue'

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
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    },
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
                }
            ]
        },
        {
            path: '/products',
            name: 'Products',
            component: () =>
                import(/* webpackChunkName: "products" */
                '../products/components/Products.vue'),
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/auth',
            name: 'Login',
            component: Login
        },
        {
            path: '/helloworld',
            name: 'HelloWorld',
            component: () =>
                import(/* webpackChunkName: "dashboard" */
                '../components/HelloWorld.vue')
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
