<template>
    <div>
        <nav class="panel">
            <p class="panel-heading">
                Изменить или удалить продукт
            </p>
            <div class="panel-block">
                <div class="field">
                    <p class="control has-icons-left">
                        <input class="input is-medium" type="text" placeholder="поиск">
                        <span class="icon is-left has-text-primary">
                            <i class="mdi mdi-magnify mdi-24px" aria-hidden="true"></i>
                        </span>
                    </p>
                </div>
            </div>
            <p class="panel-tabs is-size-4">
                <router-link v-for="category in categories" :key="category.value" :to="{name: 'ProductsCategory', params: {category: category.value}}">
                    {{ category.label }}
                </router-link>
            </p>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'Products',
    data() {
        return {
            categories: [
                {
                    value: 'bread',
                    label: 'Хлеб'
                },
                {
                    value: 'cakes',
                    label: 'Кондитерка'
                },
                {
                    value: 'order',
                    label: 'На заказ'
                }
            ]
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('PRODUCTS_component')
    }
}
</script>

<style lang="scss">
@import '../../_variables';
a {
    color: $primary-shadow;
    &.router-link-active {
        color: $primary;
    }
}
</style>
