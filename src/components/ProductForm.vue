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
                <div class="field">
                        <p class="tags">
                            <span v-if="sort !== ''" v-for="sort in formData.sorts" :key="sort" class="tag is-success">{{ sort }}</span>
                        </p>
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
                </div>
                <div class="column is-full">
                    <div class="field">
                        <figure class="image is-350x350">
                            <button @click="onPreviewRemove" class="button is-success">
                                <span class="icon">
                                <i class="fas fa-times"></i>
                                </span>
                            </button>
                            <img :src="preview" alt="">
                        </figure>
                    </div>   
                    <div class="field">
                        <div class="control has-text-left">
                            <button class="button is-primary" @click="checkForm">Посмотреть</button>
                        </div>
                    </div>                        
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import FormGenerator from './form/FormGenerator'
export default {
    name: 'ProductForm',
    components: { FormGenerator },
    data() {
        return {
            formData: {
                productName: '',
                category: 'Выбери категорию продукта:',
                weight: '',
                price: '',
                content: '',
                ingridients: '',
                sorts: [],
                attachment: '',
                image: ''
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
            preview: null,
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
            }
        }
    },
    methods: {
        onValueChange: function(formData, fieldName, value) {
            if (value) {
                this.errors[fieldName] = []
                console.log(value)
            }
        },
        checkForm: function() {
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
            if (!this.formData.price) {
                this.errors.price.push('Укажи цену продукта.')
            }
            if (this.formData.price && !priceRegex.test(this.formData.price)) {
                this.errors.price.push('Укажи цену продукта в формате 50.00')
            }
            if (
                !this.errors.category.length &&
                !this.errors.productName.length &&
                !this.errors.price.length
            ) {
                this.submitPreview(this.formData)
            }
        },
        submitPreview: function(formData) {
            console.log(formData)
        },
        onFileUpload: function(event) {
            this.file = event.target.files[0]
            this.preview = URL.createObjectURL(this.file)
        },
        onPreviewRemove: function() {
            this.file = null
            this.preview = null
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../_variables';
figure {
    min-height: 350px;
    background: $success-shadow;
    position: relative;
    img {
        min-height: 350px;
    }
    button {
        position: absolute;
        right: 0;
        top: 0;
    }
}
span.tag,
span.file-label {
    color: $primary;
}
span.tag {
    font-weight: 600;
}
</style>
