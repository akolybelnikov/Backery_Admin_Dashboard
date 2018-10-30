<template>
    <div v-if="createdProduct" class="card">
        <div class="card-image">
            <icon-base 
                width="300"
                height="300"
                fill="#52082D"
                icon-name="cake">
                <icon-cake />
            </icon-base>
        </div>
        <div class="card-content">
            Продукт создан и сохранён в базе данных со статусом:
            <p v-if="createdProduct.status" class="has-text-danger">active</p>
            <p v-else class="has-text-danger">inactive</p>
            Если статус продукта active, продукт опубликован в онлайн магазине.
            В противном случае продукт сохранён в базе данных для дальнейших действий. 
        </div>
    </div>
    <div v-else>
        <div class="card">
            <div class="card-image">
                <icon-base 
                    width="300"
                    height="300"
                    fill="#52082D"
                    icon-name="cake">
                    <icon-cake />
                </icon-base>
            </div>
            <div class="card-content">
                Вначале создай продукт.
            </div>
        </div>
    </div>
</template>

<script lang='js'>
import IconBase from '../../components/IconBase.vue'
import IconCake from '../../components/icons/IconCake.vue'
export default {
    name: 'ProductCreated',
     components: {
        IconBase,
        IconCake
    },
    data() {
        return {
            createdProduct: null
        }
    },
    created() {
        this.isCreated()
    },
    methods: {
        isCreated() {
            if (this.$route.params.createdProduct) this.createdProduct = this.$route.params.createdProduct
            console.log(this.$route.params)
        }
    }
}
</script>
