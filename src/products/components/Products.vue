<template>
    <div>
        <nav class="panel">
            <p class="panel-heading">
                продукты
            </p>
            <div class="panel-block">
                <p class="control has-icons-left">
                    <input class="input is-medium" type="text" placeholder="поиск">
                    <span class="icon is-large is-left">
                        <i class="fas fa-search" aria-hidden="true"></i>
                    </span>
                </p>
            </div>
            <p class="panel-tabs">
                <router-link v-for="category in categories" :key="category" :to="{name: 'ProductsCategory', params: {category: category}}">
                    <h4>{{ category }}</h4>
                </router-link>
            </p>
            <router-view></router-view>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'Products',
    data() {
        return {
            categories: ['bread', 'cakes', 'order']
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('PRODUCTS_component')
    }
}
</script>
