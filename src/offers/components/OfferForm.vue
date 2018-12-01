<template>
  <div class="columns is-centered">
    <div class="column columns is-multiline has-text-left">
      <div class="column is-full">
        <form>
          <b-field label="Содержание предложения" :type="formData.content ? 'is-success' : ''">
            <b-input
              placeholder="Содержание предложения"
              v-model="formData.content"
              type="textarea"
              :rows="15"
            ></b-input>
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
                <p>Перенеси фото или нажми, чтобы загрузить</p>
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
            <preview :news="true" :content="formData.content" :src="src"></preview>
          </b-field>
          <div class="field">
            <div class="control">
              <button
                class="button is-primary is-medium is-fullwidth"
                @click="submitForm('publish')"
              >Опубликовать</button>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button
                class="button is-success is-medium is-fullwidth"
                @click="submitForm('save')"
              >Сохранить</button>
            </div>
          </div>
          <div v-if="currentRoute === 'UpdateOffer'" class="field">
            <div class="control">
              <button class="button is-info is-medium is-fullwidth" @click="deleteOffer()">Удалить</button>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <router-link
                to="/offers-list"
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
import { CreateOffer, GetOffer, UpdateOffer, DeleteOffer } from '../graphql'

export default {
    name: 'OfferForm',
    components: { Preview },
    watch: {
        $route() {
            if (this.$route.name === 'OfferForm') {
                this.src = this.currentOffer = null
                this.formData = {
                    id: '',
                    content: '',
                    attachment: '',
                    image: '',
                    status: '',
                    createdAt: ''
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
                status: '',
                id: '',
                createdAt: ''
            },
            file: null,
            src: null,
            notification: false,
            currentOffer: null,
            mutations: {
                create: CreateOffer,
                update: UpdateOffer,
                delete: DeleteOffer
            },
            queries: {
                get: GetOffer
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
        this.logger = new this.$Amplify.Logger('Offer_form')
        if (this.$route.name === 'UpdateOffer') {
            this.fetchOffer()
        }
    },
    methods: {
        fetchOffer: async function() {
            try {
                const result = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.queries.get, {
                        id: this.$route.params.id
                    })
                )
                this.setData(result.data.getOffer)
            } catch (err) {
                console.error(err)
                this.$router.push({ name: 'OffersList' })
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
        submitForm: function(action) {
            if (action === 'publish') {
                this.formData.status = 'active'
            } else {
                this.formData.status = 'inactive'
            }
            this.currentRoute === 'UpdateOffer'
                ? this.updateOffer()
                : this.createOffer()
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
                const offer = makeModel(this.formData)
                this.currentOffer = offer
                const result =
                    this.currentRoute === 'OfferForm'
                        ? await this.$Amplify.API.graphql(
                              this.$Amplify.graphqlOperation(
                                  this.mutations.create,
                                  {
                                      input: offer
                                  }
                              )
                          )
                        : await this.$Amplify.API.graphql(
                              this.$Amplify.graphqlOperation(
                                  this.mutations.update,
                                  {
                                      input: offer
                                  }
                              )
                          )
                if (result.data.createOffer || result.data.updateOffer) {
                    result.data.createOffer
                        ? this.$store.commit({
                              type: 'addOffer',
                              item: this.currentOffer
                          })
                        : this.$store.commit({
                              type: 'updateOffer',
                              item: this.currentOffer
                          })
                    if (this.file) this.file = null
                    if (this.src) this.src = null
                    this.currentOffer = null
                    this.$router.push({
                        name: 'Created',
                        params: {
                            message: 'Операция успешно завершена.'
                        }
                    })
                }
            } catch (err) {
                console.error(err)
            }
        },
        createOffer: async function() {
            this.loading = true
            if (this.file) {
                await this.uploadImageToS3()
                await this.pushToDB()
                this.loading = false
            } else {
                await this.pushToDB()
            }
        },
        updateOffer: async function() {
            this.loading = true
            try {
                if (this.file) {
                    await s3Delete(this.formData.image)
                    await this.uploadImageToS3()
                    await this.pushToDB()
                } else {
                    await this.pushToDB()
                }
                this.loading = false
            } catch (err) {
                console.error(err)
                this.loading = false
            }
        },
        deleteOffer: async function() {
            this.loading = true
            try {
                const result = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.mutations.delete, {
                        input: {
                            id: this.formData.id
                        }
                    })
                )
                if (result.data.deleteOffer) {
                    this.currentOffer = null
                    if (this.file) {
                        this.file = null
                    }
                    if (this.src) {
                        this.src = null
                    }
                    this.$store.commit({
                        type: 'removeOffer',
                        id: result.data.deleteOffer.id
                    })
                    this.$router.push({
                        name: 'Created',
                        params: {
                            message: 'Специальное предложение успешно удалено.'
                        }
                    })
                }
                this.loading = false
            } catch (err) {
                console.error(err)
                this.loading = false
            }
        }
    }
}
</script>
