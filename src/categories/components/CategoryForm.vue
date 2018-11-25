<template>
    <div class="columns is-centered">
        <div class="column is-full-mobile is-half">
            <div class="columns">
                <div class="column is-full">
                    <form>
                        <form-generator :schema="schema"
                                        v-model="formData"
                                        :errors="errors"
                                        @input="onValueChange"
                        >               
                        </form-generator>         
                    </form>    
                </div>    
            </div>    
            <div class="columns is-multiline">
                <div class="column is-full">
                    <div class="field">
                        <div class="file has-name is-success is-outlined is-fullwidth">
                            <label class="file-label">
                                <input @change="onFileUpload" class="file-input" type="file" name="attachment">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Выбери изображение...
                                    </span>
                                </span>
                                <span class="file-name">
                                    {{ file && file.name }}
                                </span>
                            </label>
                        </div>
                    </div>
                    <div v-if="notification" class="notification is-danger">
                        <button @click="notification=false; file=null, image=null" class="delete is-large"></button>
                        Выбери изображение размером меньше 5 Мб.
                    </div>
                </div>
                <div class="column is-full">
                    <div class="field">
                        <preview
                            :title="formData.title"
                            :category="true"
                            :src="src"
                        ></preview>
                    </div>   
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary is-medium is-fullwidth" @click="checkForm('publish')">Опубликовать онлайн</button>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-success is-medium is-fullwidth" @click="checkForm('save')">Сохранить и опубликовать позже</button>
                        </div>    
                    </div>
                    <div v-if="currentRoute === 'UpdateCategory'" class="field">
                        <div class="control">
                            <button class="button is-info is-medium is-fullwidth" @click="deleteCategory()">Удалить из базы данных</button>
                        </div>    
                    </div>     
                    <div v-if="currentRoute === 'UpdateCategory'" class="field">
                        <div class="control">
                            <router-link to="/categories-list" class="button is-primary is-outlined is-fullwidth">Отменить</router-link>
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
import FormGenerator from '../../components/form/FormGenerator'
import { s3Upload, s3Delete } from '../../helpers/aws'
import { makeModel } from '../../helpers/model'
import Preview from '../../components/Preview'
import {
    CreateCategory,
    GetCategory,
    UpdateCategory,
    DeleteCategory
} from '../graphql'

export default {
    name: 'CategoryForm',
    components: { FormGenerator, Preview },
    data() {
        return {
            formData: {},
            file: null,
            src: null,
            schema: [
                {
                    fieldType: 'TextInput',
                    placeholder: 'Описание категории',
                    label: 'Описание категории одним английским словом',
                    name: 'name'
                },
                {
                    fieldType: 'TextInput',
                    placeholder: 'Наименование категории',
                    label: 'Наименование категории',
                    name: 'title'
                }
            ],
            errors: {
                title: []
            },
            notification: false,
            currentCategory: null,
            mutations: {
                create: CreateCategory,
                update: UpdateCategory,
                delete: DeleteCategory
            },
            actions: {
                get: GetCategory
            },
            error: false,
            loading: false
        }
    },
    computed: {
        currentRoute() {
            return this.$route.name
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('Category_form')
        if (this.$route.name === 'UpdateCategory') {
            this.fetchCategory()
        } else if (this.$route.name === 'CategoryForm') {
            this.error = this.currentCategory = null
            this.formData = {
                name: '',
                title: '',
                attachment: '',
                image: '',
                status: ''
            }
        }
    },
    methods: {
        fetchCategory: async function() {
            this.error = this.currentCategory = null
            try {
                const result = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.actions.get, {
                        name: this.$route.params.name
                    })
                )
                result.data.getCategory
                    ? this.setData(result.data.getCategory)
                    : this.$router.push({
                          name: 'Categories'
                      })
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
        onValueChange: function(fieldName, value) {
            if (value) {
                this.errors[fieldName] = []
            }
        },
        checkForm: function(action) {
            for (let field in this.errors) {
                if (this.errors.hasOwnProperty(field)) {
                    this.errors[field] = []
                }
            }
            if (!this.formData.title || this.formData.title === '') {
                this.errors.title.push('Укажи название категории.')
            }
            if (!this.errors.title.length) {
                if (action === 'publish') {
                    this.formData.status = 'active'
                } else {
                    this.formData.status = 'inactive'
                }
                this.currentRoute === 'UpdateCategory'
                    ? this.updateCategory()
                    : this.createCategory()
            }
        },
        onFileUpload: function(event) {
            if (this.notification) {
                this.notification = false
            }
            this.file = event.target.files[0]
            if (this.file.size > 5000000) {
                this.notification = true
            } else {
                this.src = URL.createObjectURL(this.file)
            }
        },
        uploadImageToS3: async function() {
            this.formData.image = `${this.formData.productId}-${this.file.name}`
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
                const category = makeModel(this.formData)
                this.currentCategory = category
                const result =
                    this.currentRoute === 'CategoryForm'
                        ? await this.$Amplify.API.graphql(
                              this.$Amplify.graphqlOperation(
                                  this.mutations.create,
                                  {
                                      input: category
                                  }
                              )
                          )
                        : await this.$Amplify.API.graphql(
                              this.$Amplify.graphqlOperation(
                                  this.mutations.update,
                                  {
                                      input: category
                                  }
                              )
                          )
                if (result.data.createCategory || result.data.updateCategory) {
                    this.currentCategory = null
                    result.data.createCategory
                        ? this.$store.commit({
                              type: 'addCategory',
                              item: result.data.createCategory
                          })
                        : this.$store.commit({
                              type: 'updateCategory',
                              item: result.data.updateCategory
                          })
                    if (this.file) this.file = null
                    if (this.src) this.src = null
                    this.$router.push({
                        name: 'Created',
                        params: {
                            message: 'Операция успешно завершена.'
                        }
                    })
                    this.loading = false
                }
            } catch (err) {
                this.error = err.toString()
                this.loading = false
            }
        },
        createCategory: async function() {
            this.loading = true
            if (this.file) {
                await this.uploadImageToS3()
                await this.pushToDB()
            } else {
                await this.pushToDB()
            }
        },
        updateCategory: async function() {
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
                this.error = true
                this.loading = false
            }
        },
        deleteCategory: async function() {
            this.loading = true
            try {
                if (this.formData.image) {
                    await s3Delete(this.formData.image)
                }
                const result = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.mutations.delete, {
                        input: {
                            name: this.formData.name
                        }
                    })
                )
                this.loading = false
                if (result.data.deleteCategory) {
                    this.currentCategory = null
                    if (this.file) {
                        this.file = null
                    }
                    if (this.src) {
                        this.src = null
                    }
                    this.$store.commit({
                        type: 'removeCategory',
                        name: result.data.deleteCategory.name
                    })
                    this.$router.push({
                        name: 'Created',
                        params: {
                            message: 'Категория успешно удалена.'
                        }
                    })
                }
            } catch (err) {
                this.error = true
                this.loading = false
            }
        }
    }
}
</script>
