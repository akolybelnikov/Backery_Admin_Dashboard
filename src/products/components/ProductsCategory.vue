<template>
    <div>
        <b-table
            :data="products"
            :paginated="isPaginated"
            :per-page="perPage"
            :current-page.sync="currentPage"
            :pagination-simple="isPaginationSimple"
            :default-sort-direction="defaultSortDirection"
            default-sort="productName"
            detailed
        >
            <template slot-scope="props">
                <b-table-column field="productName" label="Название" sortable>
                    {{ props.row.productName }}
                </b-table-column>
                <b-table-column field="createdAt" label="Дата создания" sortable centered>
                    <span class="tag is-success">{{ Number(props.row.createdAt) | moment("DD.MM.YYYY") }}</span>
                </b-table-column>
                <b-table-column field="updatedAt" label="Дата обновления" sortable centered>
                    <span class="tag is-success" v-if="props.row.updatedAt">{{ Number(props.row.updatedAt) | moment("DD.MM.YYYY") }}</span>
                </b-table-column>
                <b-table-column field="status" label="Статус" sortable centered>
                    {{ props.row.status }}
                </b-table-column>
            </template>

            <template slot="detail" slot-scope="props">
                <article class="media">
                    <figure class="media-left image is-64x64">
                        <img :src="`${url}/64x64/public/${props.row.image}`">
                    </figure>
                    <div class="media-content">
                        <div class="content">
                            <p>{{ props.row.content.substring(0, 101) }} <span v-if="props.row.content.lenght > 100">...</span></p>
                        </div>
                    </div>
                    <div class="media-right">
                        <p><strong>{{ props.row.weight }}</strong></p>
                        <p><strong>{{ props.row.price }}</strong></p>
                        <br>
                        <router-link class="button is-primary" :to="{name: 'UpdateProduct', params: {id: props.row.productId, category: props.row.category}}">
                            <span class="icon">
                            <i class="mdi mdi-chevron-right"></i>
                            </span>
                        </router-link>
                    </div>
                </article>
            </template>

        </b-table>
    </div>
</template>

<script>
import { ListProducts } from '../graphql'

export default {
    name: 'ProductsCategory',
    watch: {
        $route() {
            this.isCategory()
            this.products = this.productsByCategory
            this.listCategory()
        }
    },
    data() {
        return {
            limit: 250,
            nt: null,
            products: [],
            logger: {},
            actions: {
                list: ListProducts
            },
            category: null,
            isPaginated: true,
            isPaginationSimple: false,
            defaultSortDirection: 'desc',
            currentPage: 1,
            perPage: 10,
            url: process.env.VUE_APP_IMAGE_HANDLER_URL
        }
    },
    computed: {
        productsByCategory() {
            return this.$store.state.products[this.category]
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('PRODUCTS_component')
        this.isCategory()
        this.products = this.productsByCategory
        this.listCategory()
    },
    methods: {
        isCategory: function() {
            this.category = this.$route.params.category
        },
        async listCategory() {
            if (!this.products || !this.products.length) {
                try {
                    const response = await this.$Amplify.API.graphql(
                        this.$Amplify.graphqlOperation(this.actions.list, {
                            filter: { category: { eq: this.category } },
                            limit: this.limit,
                            nextToken: this.nt
                        })
                    )
                    this.products = response.data.listProducts.items
                    this.nt = response.data.listProducts.nextToken
                    this.$store.commit({
                        type: 'setProducts',
                        category: this.category,
                        items: response.data.listProducts.items
                    })
                    this.logger.info(
                        `Category successfully listed: `,
                        this.category
                    )
                } catch (err) {
                    this.logger.error(`Error listing products: `, err)
                }
            }
        }
    }
}
</script>
