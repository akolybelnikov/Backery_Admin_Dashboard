<template>
    <div v-if="categories">
        <b-table
            :data="categories"
            :default-sort-direction="'desc'"
            default-sort="name"
            detailed
        >
            <template slot-scope="props">
                <b-table-column field="title" label="Название" sortable>
                    {{ props.row.title }}
                </b-table-column>
                <b-table-column field="status" label="Статус" sortable centered>
                    {{ props.row.status }}
                </b-table-column>
            </template>

            <template slot="detail" slot-scope="props">
                <article class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img v-if="props.row.image" :src="`${url}/64x64/public/${props.row.image}`">
                        </p>
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>{{ props.row.title }}</p>
                        </div>
                    </div>
                    <div class="media-right">
                        <router-link class="button is-primary" :to="{name: 'UpdateCategory', params: {name: props.row.name}}">
                            <span class="icon">
                            <i class="mdi mdi-chevron-right"></i>
                            </span>
                        </router-link>
                    </div>
                </article>
            </template>

        </b-table>
    </div>
    <div v-else>Nothing found</div>
</template>

<script>
import { ListCategories } from '../graphql'

export default {
    name: 'Categories',
    data() {
        return {
            categories: [],
            logger: {},
            actions: {
                list: ListCategories
            },
            url: process.env.VUE_APP_IMAGE_HANDLER_URL
        }
    },
    computed: {
        fetchCategoriesFromStore() {
            return this.$store.state.categories
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('Categories_component')
        this.categories = this.fetchCategoriesFromStore
        this.listCategories()
    },
    methods: {
        async listCategories() {
            if (!this.categories || !this.categories.length) {
                try {
                    const response = await this.$Amplify.API.graphql(
                        this.$Amplify.graphqlOperation(this.actions.list, {})
                    )
                    this.categories = response.data.listCategories.items
                    this.$store.commit({
                        type: 'setCategories',
                        items: response.data.listCategories.items
                    })
                } catch (err) {
                    this.logger.error(`Error listing categories: `, err)
                }
            }
        }
    }
}
</script>
<style lang="scss">
@import '../../_variables.scss';
.b-table .table tr.detail {
    background: $success-shadow;
    box-shadow: inset 0 1px 3px $success;
    color: $info;
}
.table {
    color: $primary;
}
</style>
