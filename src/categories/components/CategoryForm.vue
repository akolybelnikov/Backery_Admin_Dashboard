<template>
  <div class="columns is-centered is-multiline">
    <div class="column is-half columns is-multiline">
      <div class="column is-full">
        <form>
          <b-field
            label="Описание категории одним английским словом"
            :type="errors.name && errors.name.length ? 'is-danger' : formData.name ? 'is-success' : ''"
            :message="errors.name"
          >
            <b-input placeholder="Описание категории" v-model="formData.name" type="text"></b-input>
          </b-field>
          <b-field
            label="Наименование категории"
            :type="errors.title && errors.title.length ? 'is-danger' : formData.title ? 'is-success' : ''"
            :message="errors.title"
          >
            <b-input placeholder="Наименование категории" v-model="formData.title" type="text"></b-input>
          </b-field>
        </form>
      </div>
      <div class="column is-full">
        <b-field label="Изображение">
          <b-upload @input="onFileUpload" v-model="file" drag-drop>
            <section class="section">
              <div class="content has-text-centered">
                <p>
                  <b-icon icon="upload" size="is-large"></b-icon>
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
    <div class="column is-half">
      <div class="columns is-multiline">
        <div class="column is-full">
          <b-field label="Предварительный просмотр">
            <preview :title="formData.title" :category="true" :src="src"></preview>
          </b-field>
          <div class="field">
            <div class="control">
              <button
                class="button is-primary is-medium is-fullwidth"
                @click="checkForm('publish')"
              >Опубликовать</button>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button
                class="button is-success is-medium is-fullwidth"
                @click="checkForm('save')"
              >Сохранить</button>
            </div>
          </div>
          <div v-if="currentRoute === 'UpdateCategory'" class="field">
            <div class="control">
              <button
                class="button is-info is-medium is-fullwidth"
                @click="deleteCategory()"
              >Удалить</button>
            </div>
          </div>
          <div v-if="currentRoute === 'UpdateCategory'" class="field">
            <div class="control">
              <router-link
                to="/categories-list"
                class="button is-primary is-outlined is-fullwidth"
              >Отменить</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" :class="{'is-active': loading}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <p class="has-text-success">... загрузка может занять некоторое время ...</p>
        <br>
        <br>
        <span class="icon has-text-success">
          <i class="fas fa-spinner fa-pulse"></i>
        </span>
      </div>
    </div>
  </div>
</template>


<script>
import { s3Upload, s3Delete } from '../../helpers/aws'
import { makeModel, setFormData } from '../../helpers/model'
import Preview from '../../components/Preview'
import {
    CreateCategory,
    GetCategory,
    UpdateCategory,
    DeleteCategory
} from '../graphql'

export default {
    name: 'CategoryForm',
    components: { Preview },
    watch: {
        $route() {
            if (this.$route.name === 'CategoryForm') {
                this.src = null
                this.formData = {
                    name: '',
                    title: '',
                    attachment: '',
                    image: '',
                    status: ''
                }
            }
            if (this.$route.name === 'UpdateCategory') {
                this.currentCategory
                    ? this.setData(this.currentCategory)
                    : this.$router.push({
                          name: 'CategoriesList'
                      })
            }
        }
    },
    data() {
        return {
            formData: {
                name: '',
                title: '',
                attachment: '',
                image: '',
                status: ''
            },
            file: null,
            src: null,
            errors: {
                title: [],
                name: []
            },
            notification: false,
            mutations: {
                create: CreateCategory,
                update: UpdateCategory,
                delete: DeleteCategory
            },
            actions: {
                get: GetCategory
            },
            loading: false
        }
    },
    computed: {
        currentRoute() {
            return this.$route.name
        },
        currentCategory() {
            return this.$store.getters.getCategoryByName(
                this.$route.params.name
            )
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('Category_form')
        if (this.$route.name === 'UpdateCategory') {
            this.currentCategory
                ? this.setData(this.currentCategory)
                : this.$router.push({
                      name: 'CategoriesList'
                  })
        }
    },
    methods: {
        setData: function(data) {
            this.formData = setFormData(this.formData, data)
            if (this.formData.image) {
                this.src = `${
                    process.env.VUE_APP_IMAGE_HANDLER_URL
                }/128x128/public/${data.image}`
            }
        },
        checkForm: function(action) {
            for (let field in this.errors) {
                if (this.errors.hasOwnProperty(field)) {
                    this.errors[field] = []
                }
            }
            if (!this.formData.name || this.formData.name === '') {
                this.errors.name.push('Укажи название категории.')
            }
            if (!this.formData.title || this.formData.title === '') {
                this.errors.title.push('Укажи название категории.')
            }
            if (!this.errors.name.length && !this.errors.title.length) {
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
        onFileUpload: function() {
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
            this.formData.image = `${this.formData.productId}-${this.file.name}`
            try {
                const key = await s3Upload(this.file, this.formData.image)
                this.formData.attachment = `${
                    process.env.VUE_APP_UPLOAD_URL
                }/${key}`
            } catch (err) {
                this.loading = false
                console.error(err)
            }
        },
        pushToDB: async function() {
            try {
                const category = makeModel(this.formData)
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
                console.error(err)
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
                this.loading = false
                console.error(err)
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
                this.loading = false
                console.error(err)
            }
        }
    }
}
</script>
