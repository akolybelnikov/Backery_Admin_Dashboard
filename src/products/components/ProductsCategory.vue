<template>
    <div>
        <a v-if="products.length" v-for="product in products" :key="product.productId" class="panel-block">
            {{ product.productName}}
        </a>
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
            category: null
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
                            limit: this.limit
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
