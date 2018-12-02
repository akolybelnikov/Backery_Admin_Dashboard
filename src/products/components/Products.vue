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
            <p class="panel-tabs is-size-4-tablet">
                <router-link v-for="category in categories" :key="category.name" :to="{name: 'ProductsCategory', params: {category: category.name}}">
                    {{ category.title }}
                </router-link>
            </p>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'Products',
    computed: {
        ...mapState(['categories'])
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
