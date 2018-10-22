<template>
    <div class="columns">
        <div class="column">
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
        <div class="column">

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
            schema: [
                {
                    fieldType: 'SelectList',
                    label: 'Категория продукта',
                    name: 'category',
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
