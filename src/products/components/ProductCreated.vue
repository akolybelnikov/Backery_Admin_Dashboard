<template>
    <div v-if="createdProduct" class="card">
        <div class="card-image">
            <icon-base 
                width="200"
                height="200"
                viewBox="0 0 100 100"
                fill="#52082D"
                icon-name="cake">
                <icon-cake />
            </icon-base>
        </div>
        <div class="card-content">
            <p>Продукт создан и сохранён в базе данных со статусом:</p>
            <div v-if="createdProduct.active" class="content">
                <p style="text-transform: uppercase" class="has-text-danger">active</p>
                <p class="has-text-weight-bold">Продукт опубликован в онлайн-магазине.</p>
            </div>
            <div v-else class="content">
                <p style="text-transform: uppercase" class="has-text-danger">inactive</p>
                <p class="has-text-weight-bold">Продукт не опубликован в онлайн-магазине.</p>
            </div>
        </div>
    </div>
    <div v-else>
        <div class="card">
            <div class="card-image">
                <icon-base 
                    width="300"
                    height="300"
                    viewBox="0 0 100 100"
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
        }
    }
}
</script>
