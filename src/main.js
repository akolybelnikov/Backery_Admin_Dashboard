import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './registerServiceWorker'
import Amplify from 'aws-amplify'

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
        region: process.env.VUE_APP_S3_AWS_PROJECT_REGION
    },
    API: {
        aws_appsync_graphqlEndpoint:
            process.env.VUE_APP_GRAPHQL_AWS_APPSYNC_GRAPHQLENDPOINT,
        aws_appsync_region:
            process.env.VUE_APP_GRAPHQL_GRAPHQL_ENDPOINT_IAM_REGION,
        aws_appsync_authenticationType:
            process.env.VUE_APP_GRAPHQL_AWS_APPSYNC_AUTHENTICATIONTYPE
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
