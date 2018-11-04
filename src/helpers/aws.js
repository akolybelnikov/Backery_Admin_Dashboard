import Vue from 'vue'

export async function s3Upload(file, imageName) {
    const stored = await Vue.prototype.$Amplify.Storage.put(imageName, file, {
        contentType: file.type
    })
    return stored.key
}

export async function s3Delete(imageName) {
    const deleted = await Vue.prototype.$Amplify.Storage.remove(imageName, {
        level: 'public'
    })
    return deleted
}
