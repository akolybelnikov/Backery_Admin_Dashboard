<template>
    <div class="columns is-centered">
        <div class="column columns is-multiline has-text-left">
            <div class="column is-full">           
                <form>
                    <b-field 
                        label="Содержание новости"
                        :type="formData.content ? 'is-success' : ''">
                        <b-input placeholder="Содержание новости" v-model="formData.content" type="textarea"
                        :rows="15"></b-input>
                    </b-field>    
                </form>
            </div>
            <div class="column is-full">
                <b-field label="Изображение">
                    <b-upload @input="onFileUpload" v-model="file" drag-drop>
                        <section class="section">
                            <div class="content has-text-centered">
                                <p>
                                    <b-icon
                                        icon="upload"
                                        size="is-large">
                                    </b-icon>
                                </p>
                                <p>Перетащи фото или нажми, чтобы загрузить</p>
                            </div>
                        </section>
                    </b-upload>
                </b-field>
                <div v-if="notification" class="notification is-danger">
                    <button @click="notification=false; file=null, image=null" class="delete is-large"></button>
                    Выбери изображение размером меньше 5 Мб.
                </div>
            </div>
        </div>
        <div class="column is-full-mobile is-half">       
            <div class="columns is-multiline">
                <div class="column is-full">
                    <b-field label="Предварительный просмотр">
                        <preview
                            :news="true"
                            :content="formData.content"
                            :src="src"
                        ></preview>
                    </b-field>   
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary is-medium is-fullwidth" @click="submitForm('publish')">Опубликовать</button>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-success is-medium is-fullwidth" @click="submitForm('save')">Сохранить</button>
                        </div>    
                    </div>
                    <div v-if="currentRoute === 'UpdateNews'" class="field">
                        <div class="control">
                            <button class="button is-info is-medium is-fullwidth" @click="deleteNews()">Удалить</button>
                        </div>    
                    </div>     
                    <div v-if="currentRoute === 'UpdateNews'" class="field">
                        <div class="control">
                            <router-link to="/news-list" class="button is-primary is-outlined is-fullwidth">Отменить</router-link>
                        </div>    
                    </div>                      
                </div>
            </div>
        </div>
        <div class="modal" :class="{'is-active': loading}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <p class="has-text-success">... загрузка может занять некоторое время ...</p><br><br>
                <span class="icon has-text-success">
                    <i class="fas fa-spinner fa-pulse"></i>
                </span>
            </div>
        </div>
    </div>
</template>


<script>
import { s3Upload, s3Delete } from '../../helpers/aws'
import { makeModel } from '../../helpers/model'
import Preview from '../../components/Preview'
import { CreateNews, GetNews, UpdateNews, DeleteNews } from '../graphql'

export default {
    name: 'NewsForm',
    components: { Preview },
    watch: {
        $route() {
            if (this.$route.name === 'NewsForm') {
                this.src = this.currentNews = null
                this.formData = {
                    content: '',
                    attachment: '',
                    image: '',
                    status: ''
                }
            }
        }
    },
    data() {
        return {
            formData: {
                content: '',
                attachment: '',
                image: '',
                status: ''
            },
            file: null,
            src: null,
            notification: false,
            currentNews: null,
            mutations: {
                create: CreateNews,
                update: UpdateNews,
                delete: DeleteNews
            },
            actions: {
                get: GetNews
            },
            loading: false
        }
    },
    computed: {
        currentRoute() {
            return this.$route.name
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('News_form')
        if (this.$route.name === 'UpdateNews') {
            this.fetchNews()
        }
    },
    methods: {
        fetchNews: async function() {
            try {
                const result = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.actions.get, {
                        id: this.$route.params.id
                    })
                )
                this.setData(result.data.getNews)
            } catch (err) {
                this.error = true
            }
        },
        setData: function(data) {
            for (let key in data) {
                if (data.hasOwnProperty(key)) {
                    if (
                        data[key] &&
                        data[key] !== undefined &&
                        data[key] !== ''
                    ) {
                        this.formData[key] = data[key]
                    }
                }
            }
            if (this.formData.image) {
                this.src = `${
                    process.env.VUE_APP_IMAGE_HANDLER_URL
                }/450x450/public/${data.image}`
            }
        },
        submitForm: function(action) {
            if (action === 'publish') {
                this.formData.status = 'active'
            } else {
                this.formData.status = 'inactive'
            }
            this.currentRoute === 'UpdateNews'
                ? this.updateNews()
                : this.createNews()
        },
        onFileUpload: function(file) {
            if (this.notification) {
                this.notification = false
            }
            if (this.file.size > 5000000) {
                this.notification = true
            } else {
                this.src = URL.createObjectURL(this.file)
            }
        },
        uploadImageToS3: async function() {
            this.formData.image = `${this.formData.id}-${this.file.name}`
            try {
                const key = await s3Upload(this.file, this.formData.image)
                this.formData.attachment = `${
                    process.env.VUE_APP_UPLOAD_URL
                }/${key}`
            } catch (err) {
                this.loading = false
            }
        },
        pushToDB: async function() {
            try {
                const news = makeModel(this.formData)
                this.currentNews = news
                const result =
                    this.currentRoute === 'NewsForm'
                        ? await this.$Amplify.API.graphql(
                              this.$Amplify.graphqlOperation(
                                  this.mutations.create,
                                  {
                                      input: news
                                  }
                              )
                          )
                        : await this.$Amplify.API.graphql(
                              this.$Amplify.graphqlOperation(
                                  this.mutations.update,
                                  {
                                      input: news
                                  }
                              )
                          )
                if (result.data.createNews || result.data.updateNews) {
                    result.data.createNews
                        ? this.$store.commit({
                              type: 'addNews',
                              item: this.currentNews
                          })
                        : this.$store.commit({
                              type: 'updateNews',
                              item: this.currentNews
                          })
                    if (this.file) this.file = null
                    if (this.src) this.src = null
                    this.currentNews = null
                    this.$router.push({
                        name: 'Created',
                        params: {
                            message: 'Операция успешно завершена.'
                        }
                    })
                    this.loading = false
                }
            } catch (err) {
                console.error(err)
                this.loading = false
            }
        },
        createNews: async function() {
            this.formData.id = this.$uuid.v4()
            this.formData.createdAt = Date.now()
            this.loading = true
            if (this.file) {
                await this.uploadImageToS3()
                await this.pushToDB()
            } else {
                await this.pushToDB()
            }
        },
        updateNews: async function() {
            this.loading = true
            try {
                if (this.file) {
                    await s3Delete(this.formData.image)
                    await this.uploadImageToS3()
                    await this.pushToDB()
                } else {
                    await this.pushToDB()
                }
            } catch (err) {
                console.error(err)
                this.loading = false
            }
        },
        deleteNews: async function() {
            this.loading = true
            try {
                if (this.formData.image) {
                    await s3Delete(this.formData.image)
                }
                const result = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.mutations.delete, {
                        input: {
                            id: this.formData.id
                        }
                    })
                )
                this.loading = false
                if (result.data.deleteNews) {
                    this.currentNews = null
                    if (this.file) {
                        this.file = null
                    }
                    if (this.src) {
                        this.src = null
                    }
                    this.$store.commit({
                        type: 'removeNews',
                        id: result.data.deleteNews.id
                    })
                    this.$router.push({
                        name: 'Created',
                        params: {
                            message: 'Новость успешно удалена.'
                        }
                    })
                }
            } catch (err) {
                console.error(err)
                this.loading = false
            }
        }
    }
}
</script>
