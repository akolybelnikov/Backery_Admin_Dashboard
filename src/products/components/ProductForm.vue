<template>
    <div class="columns">
        <div class="column is-full-mobile is-half">
            <form>
                <form-generator :schema="schema"
                                v-model="formData"
                                :errors="errors"
                                @input="onValueChange"
                >               
                </form-generator>
                <div class="field">
                    <label class="label has-text-left">Начинки</label>
                    <div class="select is-fullwidth is-success is-multiple">
                        <select v-model="formData.sorts" multiple>
                            <option v-for="option in sortsOptions"
                                v-bind:value="option"
                                :key="option">
                                {{ option }}
                            </option>
                        </select>
                    </div>
                </div>           
            </form>    
        </div>
        <div class="column is-full-mobile is-half">
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
                        <button @click="notification=false" class="delete is-large"></button>
                        Выбери изображение размером меньше 5 Мб.
                    </div>
                </div>
                <div class="column is-full">
                    <div class="field">
                        <preview
                            :product="true"
                            :title="formData.productName"
                            :description="formData.content"
                            :ingridients="formData.ingridients"
                            :weight="formData.weight"
                            :price="formData.price"
                            :sorts="formData.sorts"
                            :src="src"
                        ></preview>
                    </div>   
                    <div v-if="currentRoute !== 'UpdateProduct'" class="field">
                        <div class="control">
                            <button class="button is-primary is-medium is-fullwidth" @click="checkForm('publish')">Опубликовать в онлайн-магазине</button>
                        </div>
                    </div>
                    <div v-if="currentRoute !== 'UpdateProduct'" class="field">
                        <div class="control">
                            <button class="button is-success is-medium is-fullwidth" @click="checkForm('save')">Сохранить и опубликовать позже</button>
                        </div>    
                    </div>
                    <div v-if="currentRoute === 'UpdateProduct'" class="field">
                        <div class="control">
                            <button class="button is-primary is-medium is-fullwidth" @click="checkForm('publish')">Aктивировать</button>
                        </div>
                    </div>
                    <div v-if="currentRoute === 'UpdateProduct'" class="field">
                        <div class="control">
                            <button class="button is-success is-medium is-fullwidth" @click="checkForm('save')">Деактивировать</button>
                        </div>    
                    </div> 
                    <div v-if="currentRoute === 'UpdateProduct'" class="field">
                        <div class="control">
                            <button class="button is-info is-medium is-fullwidth" @click="deleteProduct()">Удалить из базы данных</button>
                        </div>    
                    </div>     
                    <div v-if="currentRoute === 'UpdateProduct'" class="field">
                        <div class="control">
                            <router-link to="/products-list/bread" class="button is-primary is-outlined is-fullwidth">Отменить</router-link>
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
import Preview from '../../components/Preview'
import { s3Upload, s3Delete } from '../../helpers/aws'
import {
    CreateProduct,
    GetProduct,
    UpdateProduct,
    DeleteProduct
} from '../graphql'

export default {
    name: 'ProductForm',
    components: { FormGenerator, Preview },
    data() {
        return {
            formData: {
                productId: '',
                productName: '',
                category: 'Выбери категорию продукта:',
                weight: '',
                price: '',
                content: '',
                ingridients: '',
                sorts: [],
                attachment: '',
                image: '',
                status: '',
                createdAt: '',
                updatedAt: ''
            },
            sortsOptions: [
                '',
                'йогуртовая',
                'вишня в шоколаде',
                'воздушно–ореховая',
                'медовая',
                'птичье молоко',
                'мокрый шоколад',
                'чизкейк',
                'морковная',
                'тирамису',
                'нежная сливочная',
                'клубничный тирамису',
                'пралине',
                'фруктово-ягодная'
            ],
            file: null,
            src: null,
            schema: [
                {
                    fieldType: 'SelectList',
                    label: 'Категория продукта',
                    name: 'category',
                    options: [
                        {
                            label: 'Хлеб и булочки',
                            value: 'bread'
                        },
                        {
                            label: 'Кондитерка',
                            value: 'cakes'
                        },
                        {
                            label: 'На заказ',
                            value: 'order'
                        }
                    ],
                    disabled: 'Выбери категорию продукта:'
                },
                {
                    fieldType: 'TextInput',
                    placeholder: 'Наименование продукта',
                    label: 'Наименование продукта',
                    name: 'productName'
                },
                {
                    fieldType: 'TextInput',
                    placeholder: 'Вес продукта',
                    label: 'Вес продукта',
                    name: 'weight'
                },
                {
                    fieldType: 'NumberInput',
                    label: 'Цена продукта',
                    name: 'price',
                    placeholder: 'Цена в формате: 50.00'
                },
                {
                    fieldType: 'TextArea',
                    placeholder: 'Описание продукта',
                    label: 'Описание продукта',
                    name: 'content'
                },
                {
                    fieldType: 'TextArea',
                    placeholder: 'Состав продукта',
                    label: 'Состав продукта',
                    name: 'ingridients'
                }
            ],
            errors: {
                category: [],
                productName: [],
                price: []
            },
            notification: false,
            currentProduct: null,
            mutations: {
                create: CreateProduct,
                update: UpdateProduct,
                delete: DeleteProduct
            },
            actions: {
                get: GetProduct
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
        this.logger = new this.$Amplify.Logger('PRODUCT_FORM')
        if (this.$route.name === 'UpdateProduct') {
            this.fetchProduct()
        } else if (this.$route.name === 'ProductForm') {
            this.error = this.currentProduct = null
            this.formData = {
                productId: '',
                productName: '',
                category: 'Выбери категорию продукта:',
                weight: '',
                price: '',
                content: '',
                ingridients: '',
                sorts: [],
                attachment: '',
                image: '',
                status: '',
                createdAt: '',
                updatedAt: ''
            }
        }
    },
    methods: {
        fetchProduct: async function() {
            this.error = this.currentProduct = null
            try {
                const result = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.actions.get, {
                        productId: this.$route.params.id,
                        category: this.$route.params.category
                    })
                )
                this.setData(result.data.getProduct)
            } catch (err) {
                this.error = true
                console.error(err)
            }
        },
        setData: function(productData) {
            for (let key in productData) {
                if (productData.hasOwnProperty(key)) {
                    if (
                        productData[key] &&
                        productData[key] !== undefined &&
                        productData[key] !== ''
                    ) {
                        this.formData[key] = productData[key]
                    }
                }
            }
            if (this.formData.image) {
                this.src = `${
                    process.env.VUE_APP_IMAGE_HANDLER_URL
                }/450x450/public/${productData.image}`
            }
        },
        onValueChange: function(fieldName, value) {
            if (value) {
                this.errors[fieldName] = []
            }
        },
        checkForm: function(action) {
            let priceRegex = new RegExp(/^\d*(\.\d{2,2})$/)
            for (let field in this.errors) {
                if (this.errors.hasOwnProperty(field)) {
                    this.errors[field] = []
                }
            }
            if (
                !this.formData.category ||
                this.formData.category === 'Выбери категорию продукта:'
            ) {
                this.errors.category.push('Выбери категорию продукта.')
            }
            if (!this.formData.productName) {
                this.errors.productName.push('Введи наименование продукта.')
            }
            if (this.formData.price && !priceRegex.test(this.formData.price)) {
                this.errors.price.push('Укажи цену продукта в формате 50.00')
            }
            if (
                !this.errors.category.length &&
                !this.errors.productName.length &&
                !this.errors.price.length
            ) {
                if (action === 'publish') {
                    this.formData.status = 'active'
                } else {
                    this.formData.status = 'inactive'
                }
                this.currentRoute === 'UpdateProduct'
                    ? this.updateProduct()
                    : this.createProduct()
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
                console.error(err)
            }
        },
        createProduct: async function() {
            this.loading = true
            this.formData.createdAt = Date.now()
            this.formData.productId = this.$uuid.v4()
            if (this.file) {
                await this.uploadImageToS3()
                await this.pushProductToDB()
            } else {
                await this.pushProductToDB()
            }
        },
        makeProduct: function(productData) {
            let product = {}
            for (let key in productData) {
                if (productData.hasOwnProperty(key)) {
                    if (
                        productData[key] &&
                        productData[key] !== undefined &&
                        productData[key] !== ''
                    ) {
                        product[key] = productData[key]
                    }
                }
            }
            this.currentProduct = product
            return product
        },
        pushProductToDB: async function() {
            try {
                const product = this.makeProduct(this.formData)
                const result =
                    this.currentRoute === 'ProductForm'
                        ? await this.$Amplify.API.graphql(
                              this.$Amplify.graphqlOperation(
                                  this.mutations.create,
                                  {
                                      input: product
                                  }
                              )
                          )
                        : await this.$Amplify.API.graphql(
                              this.$Amplify.graphqlOperation(
                                  this.mutations.update,
                                  {
                                      input: product
                                  }
                              )
                          )
                if (result.data.createProduct) {
                    this.$store.commit({
                        type: 'addProduct',
                        category: result.data.createProduct.category,
                        item: this.currentProduct
                    })
                } else if (result.data.updateProduct) {
                    this.$store.commit({
                        type: 'updateProduct',
                        category: result.data.updateProduct.category,
                        item: this.currentProduct
                    })
                }
                this.currentProduct = null
                if (this.file) this.file = null
                if (this.src) this.src = null
                this.$router.push({
                    name: 'Created',
                    params: {
                        message: 'Операция успешно завершена.'
                    }
                })
                this.loading = false
            } catch (err) {
                console.error(err)
                this.loading = false
            }
        },
        deleteProduct: async function() {
            this.loading = true
            try {
                if (this.formData.image) {
                    await s3Delete(this.formData.image)
                }
                const result = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.mutations.delete, {
                        input: {
                            productId: this.formData.productId,
                            category: this.formData.category
                        }
                    })
                )
                if (result.data.deleteProduct) {
                    this.currentProduct = null
                    this.$store.commit({
                        type: 'removeProduct',
                        category: result.data.deleteProduct.category,
                        productId: result.data.deleteProduct.productId
                    })
                    if (this.file) this.file = null
                    if (this.src) this.src = null
                    this.$router.push({
                        name: 'Created',
                        params: {
                            message: 'Продукт успешно удалён.'
                        }
                    })
                    this.loading = false
                }
            } catch (err) {
                this.error = true
                this.loading = false
                console.error(err)
            }
        },
        updateProduct: async function() {
            this.loading = true
            this.formData.updatedAt = Date.now()
            try {
                if (this.file) {
                    await s3Delete(this.formData.image)
                    await this.uploadImageToS3()
                    await this.pushProductToDB()
                } else {
                    await this.pushProductToDB()
                }
            } catch (err) {
                this.error = true
                this.loading = false
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../_variables';
i {
    font-size: 3rem;
}
span.file-label {
    color: $primary;
}
</style>
