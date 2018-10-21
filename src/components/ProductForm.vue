<template>
    <div class="columns is-flex is-centered">
    <div class="column is-full-mobile is-half-desktop">
        <form
        @submit.prevent="checkForm">
            <div class="field">
                <div class="control has-text-left">
                    <input class="button is-primary is-outlined" type="submit" value="Создать продукт">
                </div>
            </div> 
            <form-generator :schema="schema"
                            v-model="formData"
                            :errors="errors"
                            @input="validateFormField"
            >               
            </form-generator>
        </form>    
    </div>
    <div class="column is-half-desktop is-full-mobile">

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
                sorts: []
            },
            schema: [
                {
                    fieldType: 'SelectList',
                    label: 'Категория продукта',
                    name: 'category',
                    multi: false,
                    options: [
                        'Выбери категорию продукта:',
                        'Хлеб и булки',
                        'Кондитерка',
                        'На заказ'
                    ]
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
                    placeholder: 'Цена продукта в формате: 50.00'
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
                },
                {
                    fieldType: 'SelectList',
                    label: 'Начинки продукта',
                    name: 'sorts',
                    multi: true,
                    options: [
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
                    ]
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
        validateFormField: function(formData, fieldName, value) {
            console.log(formData, fieldName, value)
            if (value) {
                this.errors[fieldName] = []
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
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
