import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './registerServiceWorker'
import Amplify from 'aws-amplify'
import UUID from 'vue-uuid'
import Table from 'buefy/dist/components/table'

Vue.use(UUID)
Vue.use(Table)
Vue.use(require('vue-moment'))

Amplify.configure({
    Auth: {
        identityPoolId: process.env.VUE_APP_COGNITO_IDENTITY_POOL_ID,
        region: process.env.VUE_APP_COGNITO_AWS_PROJECT_REGION,
        mandatorySignIn: true,
        userPoolId: process.env.VUE_APP_COGNITO_USER_POOL_ID,
        userPoolWebClientId: process.env.VUE_APP_COGNITO_APP_CLIENT_ID
    },
    Storage: {
        bucket: process.env.VUE_APP_S3_AWS_BUCKET_NAME,
        region: process.env.VUE_APP_S3_AWS_PROJECT_REGION,
        identityPoolId: process.env.VUE_APP_S3_AWS_IDENTITY_POOL_ID
    },
    API: {
        aws_appsync_graphqlEndpoint:
            process.env.VUE_APP_GRAPHQL_AWS_APPSYNC_GRAPHQLENDPOINT,
        aws_appsync_region:
            process.env.VUE_APP_GRAPHQL_GRAPHQL_ENDPOINT_IAM_REGION,
        aws_appsync_authenticationType:
            process.env.VUE_APP_GRAPHQL_AWS_APPSYNC_AUTHENTICATIONTYPE,
        aws_appsync_apiKey: process.env.VUE_APP_GRAPHQL_AWS_APPSYNC_APIKEY
    }
})

Vue.config.productionTip = false

new Vue({
    router,
    store,
    beforeCreate() {
        store.commit('initializeStore')
    },
    render: h => h(App)
}).$mount('#app')
