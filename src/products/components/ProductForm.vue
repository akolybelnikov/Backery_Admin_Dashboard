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
                        <product-preview
                            :title="formData.productName"
                            :description="formData.content"
                            :ingridients="formData.ingridients"
                            :weight="formData.weight"
                            :price="formData.price"
                            :sorts="formData.sorts"
                            :src="src"
                            @click="onImageRemove"
                        ></product-preview>
                    </div>   
                    <div class="field">
                        <div class="control">
                            <button class="button is-primary is-medium is-fullwidth" @click="checkForm('publish')">Опубликовать в онлайн-магазине</button>
                        </div>
                    </div>
                    <div class="filed">
                        <div class="control">
                            <button class="button is-success is-medium is-fullwidth" @click="checkForm('save')">Сохранить и опубликовать позже</button>
                        </div>    
                    </div>                        
                </div>
            </div>
        </div>
        <div class="modal" :class="{'is-active': loading}">
            <div class="modal-background"></div>
            <div class="modal-content">
                <p class="has-text-success">Создание продукта может занять некоторое время ...</p><br><br>
                <span class="icon has-text-success">
                    <i class="fas fa-spinner fa-pulse"></i>
                </span>
            </div>
            </div>
    </div>
</template>


<script>
import FormGenerator from '../../components/form/FormGenerator'
import ProductPreview from './ProductPreview'
import { s3Upload } from '../../helpers/aws'
import { CreateProduct } from '../graphql'

export default {
    name: 'ProductForm',
    components: { FormGenerator, ProductPreview },
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
                active: false
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
                            label: 'Хлеб и булки',
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
            createdProduct: null,
            notification: false,
            mutations: {
                create: CreateProduct
            }
        }
    },
    computed: {
        getCreatedProduct() {
            return this.$store.getters.getCreatedProduct
        },
        loading() {
            return this.$store.state.loading
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('PRODUCT_FORM')
        this.formData = { ...this.formData, ...this.getCreatedProduct }
    },
    methods: {
        onValueChange: function(fieldName, value) {
            if (value) {
                this.errors[fieldName] = []
            }
            this.$store.commit('setCreatedProduct', this.formData)
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
                    (this.formData.active = true)
                }
                this.createProduct()
            }
        },
        onFileUpload: function(event) {
            if (this.notification) this.notification = false
            this.file = event.target.files[0]
            if (this.file.size > 5000000) {
                this.notification = true
            } else {
                this.src = URL.createObjectURL(this.file)
            }
        },
        onImageRemove: function() {
            this.file = null
            this.src = null
        },
        createProduct: async function() {
            this.formData.productId = this.$uuid.v4()
            this.formData.image = `${this.formData.productId}-${this.file.name}`
            this.$store.commit('setLoading', true)
            try {
                const key = this.file
                    ? await s3Upload(this.file, this.formData.image)
                    : null
                this.formData.attachment = `https://vsebulochki-images.s3.eu-central-1.amazonaws.com/public/${key}`
                this.pushProductToDB()
            } catch (err) {
                this.$store.commit('setLoading', false)
            }
        },
        pushProductToDB: async function() {
            try {
                let newProduct = {}
                for (let key in this.formData) {
                    if (this.formData.hasOwnProperty(key)) {
                        if (
                            this.formData[key] &&
                            this.formData[key] !== undefined &&
                            this.formData[key] !== ''
                        ) {
                            newProduct[key] = this.formData[key]
                        }
                    }
                }
                const result = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.mutations.create, {
                        input: newProduct
                    })
                )
                if (result) {
                    this.$store.commit('setCreatedProduct', null)
                    this.file = null
                    this.src = null
                    this.logger.info(`product posted: `, result)
                    this.$router.push({
                        name: 'ProductCreated',
                        params: { createdProduct: result.data.createProduct }
                    })
                    this.$store.commit('setLoading', false)
                }
            } catch (err) {
                this.logger.error(`error occured:  `, err)
                this.$store.commit('setLoading', false)
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
