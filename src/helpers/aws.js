import Vue from 'vue'
import * as AmplifyModules from 'aws-amplify'
import { AmplifyPlugin } from 'aws-amplify-vue'

Vue.use(AmplifyPlugin, AmplifyModules)

export async function s3Upload(file, imageName) {
    const stored = await Vue.prototype.$Amplify.Storage.put(imageName, file, {
        contentType: file.type
    })
    return stored.key
}
