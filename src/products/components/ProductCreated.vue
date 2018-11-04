<template>
    <div v-if="currentProduct" class="card">
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
            <p>Продукт сохранён в базе данных со статусом:</p>
            <div v-if="currentProduct.status === 'active'" class="content">
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
            <div class="card-footer">
                <p v-if="deleted" class="card-footer-item">Продукт удалён из базы данных.</p>
                <p v-else class="card-footer-item">Создай, измени или удали продукт.</p>
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
            currentProduct: null,
            deleted: false
        }
    },
    created() {
        this.isCreated()
    },
    methods: {
        isCreated() {
            if (this.$route.params.currentProduct) this.currentProduct = this.$route.params.currentProduct
            if (this.$route.params.deleted) this.deleted = true
        }
    }
}
</script>
