<template>
  <div class="columns is-centered is-multiline">
    <div class="column is-half columns is-multiline">
      <div class="column is-full">
        <form>
          <b-field v-if="currentRoute !== 'UpdateFilling'"
            label="Описание начинки одним английским словом"
            :type="errors.name && errors.name.length ? 'is-danger' : formData.name ? 'is-success' : ''"
            :message="errors.name"
          >
            <b-input placeholder="Описание начинки" v-model="formData.name" type="text"></b-input>
          </b-field>
          <b-field
            label="Наименование начинки"
            :type="errors.label && errors.label.length ? 'is-danger' : formData.label ? 'is-success' : ''"
            :message="errors.label"
          >
            <b-input placeholder="Наименование начинки" v-model="formData.label" type="text"></b-input>
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
            <preview :title="formData.label" :category="false" :src="src"></preview>
          </b-field>
          <div class="field">
            <div class="control">
              <button
                class="button is-primary is-medium is-fullwidth"
                @click="checkForm()"
              >Опубликовать</button>
            </div>
          </div>
          <div v-if="currentRoute === 'UpdateFilling'" class="field">
            <div class="control">
              <button class="button is-info is-medium is-fullwidth" @click="deleteFilling()">Удалить</button>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <router-link
                to="/fillings-list"
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
    CreateFilling,
    GetFilling,
    UpdateFilling,
    DeleteFilling
} from '../graphql'

export default {
    name: 'FillingForm',
    components: { Preview },
    watch: {
        $route() {
            if (this.$route.name === 'FillingForm') {
                this.src = this.currentFilling = null
                this.formData = {
                    name: '',
                    label: '',
                    attachment: '',
                    image: ''
                }
            }
        }
    },
    data() {
        return {
            formData: {
                name: '',
                label: '',
                attachment: '',
                image: ''
            },
            file: null,
            src: null,
            errors: {
                label: [],
                name: []
            },
            notification: false,
            currentFilling: null,
            mutations: {
                create: CreateFilling,
                update: UpdateFilling,
                delete: DeleteFilling
            },
            queries: {
                get: GetFilling
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
        this.logger = new this.$Amplify.Logger('Filling_form')
        if (this.$route.name === 'UpdateFilling') {
            this.fetchFilling()
        }
    },
    methods: {
        fetchFilling: async function() {
            if (this.currentFilling) this.currentFilling = null
            try {
                const result = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.queries.get, {
                        name: this.$route.params.name
                    })
                )
                if (result.data.getFilling) {
                    this.setData(result.data.getFilling)
                }
            } catch (err) {
                console.error(err)
                this.$router.push({ name: 'Fillings' })
            }
        },
        setData: function(data) {
            this.formData = setFormData(this.formData, data)
            if (this.formData.image) {
                this.src = `${
                    process.env.VUE_APP_IMAGE_HANDLER_URL
                }/450x450/public/${data.image}`
            }
        },
        checkForm: function() {
            for (let field in this.errors) {
                if (this.errors.hasOwnProperty(field)) {
                    this.errors[field] = []
                }
            }
            if (!this.formData.name || this.formData.name === '') {
                this.errors.name.push('Укажи английское название начинки.')
            }
            if (!this.formData.label || this.formData.label === '') {
                this.errors.label.push('Укажи название начинки.')
            }
            if (!this.errors.label.length && !this.errors.name.length) {
                this.currentRoute === 'UpdateFilling'
                    ? this.updateFilling()
                    : this.createFilling()
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
            this.formData.image = `${this.formData.name}-${this.file.name}`
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
                const filling = makeModel(this.formData)
                filling.name = filling.name.trim().replace(' ', '-') 
                this.currentFilling = filling
                const result =
                    this.currentRoute === 'FillingForm'
                        ? await this.$Amplify.API.graphql(
                              this.$Amplify.graphqlOperation(
                                  this.mutations.create,
                                  {
                                      input: filling
                                  }
                              )
                          )
                        : await this.$Amplify.API.graphql(
                              this.$Amplify.graphqlOperation(
                                  this.mutations.update,
                                  {
                                      input: filling
                                  }
                              )
                          )
                if (result.data.createFilling || result.data.updateFilling) {
                    this.currentFilling = null
                    result.data.createFilling
                        ? this.$store.commit({
                              type: 'addFilling',
                              item: result.data.createFilling
                          })
                        : this.$store.commit({
                              type: 'updateFilling',
                              item: result.data.updateFilling
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
        createFilling: async function() {
            this.loading = true
            if (this.file) {
                await this.uploadImageToS3()
                await this.pushToDB()
            } else {
                await this.pushToDB()
            }
        },
        updateFilling: async function() {
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
        deleteFilling: async function() {
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
                if (result.data.deleteFilling) {
                    this.currentFilling = null
                    if (this.file) {
                        this.file = null
                    }
                    if (this.src) {
                        this.src = null
                    }
                    this.$store.commit({
                        type: 'removeFilling',
                        name: result.data.deleteFilling.name
                    })
                    this.$router.push({
                        name: 'Created',
                        params: {
                            message: 'Начинка успешно удалена.'
                        }
                    })
                }
                this.loading = false
            } catch (err) {
                this.loading = false
                console.error(err)
            }
        }
    }
}
</script>
