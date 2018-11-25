<template>
    <div class="columns">
        <div class="column is-full-mobile is-half has-text-left">
            <form>
                <b-field
                    :type="
                        errors.category && errors.category.length ?
                        'is-danger' :
                        formData.category ? 'is-success' :
                        ''"
                    label="Категория продукта"
                    :message="errors.category">
                    <b-select
                        @input="() => errors.category = []"
                        v-model="formData.category"
                        placeholder="Выбери категорию продукта:"
                        expanded
                    >
                        <option
                            v-for="category in categoryOptions"
                            :value="category.name"
                            :key="category.name">
                            {{ category.title }}
                        </option>
                    </b-select>
                </b-field>
                <b-field 
                    label="Наименование продукта"
                    :type="
                        errors.productName && errors.productName.length ?
                        'is-danger' :
                        formData.productName ? 'is-success' :
                        ''"
                    :message="errors.productName">
                    <b-input placeholder="Введи название продукта" v-model="formData.productName" @input="() => errors.productName = []" type="text"></b-input>
                </b-field>
                <b-field 
                    label="Вес продукта"
                    :type="formData.weight ? 'is-success' : ''">
                    <b-input placeholder="Введи вес продукта" v-model="formData.weight" type="text"></b-input>
                </b-field>
                <b-field
                    :type="errors.price && errors.price.length ?
                    'is-danger' : formData.price ?
                    'is-success' : ''" label="Цена продукта" :message="errors.price">
                    <b-field 
                    :type="errors.price && errors.price.length ?
                    'is-danger' : formData.price ?
                    'is-success' : ''">
                        <b-input placeholder="Введи цену в формате: 50.00" v-model="formData.price" @input="() => errors.price = []" type="number" expanded></b-input>
                        <p class="control">
                            <button class="is-success button">Руб.</button>
                        </p>
                    </b-field>
                </b-field>
                <b-field 
                    label="Описание продукта"
                    :type="formData.content ? 'is-success' : ''">
                    <b-input placeholder="Описание продукта" v-model="formData.content" type="textarea"
                    :rows="10"></b-input>
                </b-field>
                <b-field 
                    label="Состав продукта"
                    :type="formData.ingridients ? 'is-success' : ''">
                    <b-input placeholder="Состав продукта" v-model="formData.ingridients" type="textarea"
                    :rows="5"></b-input>
                </b-field>
                <b-field label="Начинки">
                    <div id="sorts" class="is-flex">
                        <b-checkbox
                            v-for="sort in sortsOptions"
                            :key="sort"
                            v-model="formData.sorts"
                            :native-value="sort"
                            type="is-success"
                        >{{ sort }}</b-checkbox>
                    </div>
                </b-field>           
            </form>    
        </div>
        <div class="column is-full-mobile is-half">
            <div class="columns is-multiline">
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
                <div class="column is-full is-half-fullhd">
                    <b-field label="Предварительный просмотр">
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
                    </b-field>                   
                </div>
                <div class="column is-full is-half-fullhd">
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary is-medium is-fullwidth" @click="checkForm('publish')">Опубликовать</button>
                        </div>
                    </div>
                    <div class="field">
                        <div class="control">
                            <button class="button is-success is-medium is-fullwidth" @click="checkForm('save')">Сохранить</button>
                        </div>    
                    </div>
                    <div v-if="currentRoute === 'UpdateProduct'" class="field">
                        <div class="control">
                            <button class="button is-info is-medium is-fullwidth" @click="deleteProduct()">Удалить</button>
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
    components: { Preview },
    watch: {
        $route() {
            if (this.$route.name === 'ProductForm') {
                this.src = this.currentNews = null
                this.formData = {
                    productId: '',
                    productName: '',
                    category: '',
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
        }
    },
    data() {
        return {
            formData: {
                productId: '',
                productName: '',
                category: null,
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
            categoryOptions: [
                {
                    title: 'Хлеб и булочки',
                    name: 'bread'
                },
                {
                    title: 'Кондитерка',
                    name: 'cakes'
                },
                {
                    title: 'На заказ',
                    name: 'order'
                }
            ],
            file: null,
            src: null,
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
        }
    },
    methods: {
        fetchProduct: async function() {
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
span.icon {
    color: $primary;
}
#sorts {
    flex-wrap: wrap;
    .b-checkbox.checkbox {
        margin-left: 0.5em;
        padding: 10px;
    }
}
</style>
