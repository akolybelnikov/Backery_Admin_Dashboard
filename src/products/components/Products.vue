<template>
    <div><p v-show="products">products: {{ products }}</p></div>
</template>

<script>
// import getProduct from './persist/graphqlActions'
import { ListProducts } from '../graphql'
// import createProduct from './persist/graphqlActions'
// import updateProduct from './persist/graphqlActions'
// import deleteProduct from './persist/graphqlActions'

export default {
    name: 'Products',
    data() {
        return {
            filter: 'cakes',
            limit: 150,
            nt: null,
            products: [],
            logger: {},
            actions: {
                // create: createProduct,
                list: ListProducts
                // update: updateProduct,
                // delete: deleteProduct
            }
        }
    },
    computed: {
        productsByCategory() {
            return this.$store.state.products[this.filter]
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('PRODUCTS_component')
        this.products = this.productsByCategory
        this.list()
    },
    methods: {
        async list() {
            if (!this.products || !this.products.length) {
                try {
                    const response = await this.$Amplify.API.graphql(
                        this.$Amplify.graphqlOperation(this.actions.list, {
                            filter: { category: { eq: this.filter } },
                            limit: this.limit
                        })
                    )
                    this.products = response.data.listProducts.items
                    this.nt = response.data.listProducts.nextToken
                    this.$store.commit({
                        type: 'setProducts',
                        category: this.filter,
                        items: response.data.listProducts.items
                    })
                    this.logger.info(`Products successfully listed: `)
                } catch (err) {
                    this.logger.error(`Error listing products: `, err)
                }
            } else {
                this.logger.info(this.products)
            }
        }
    }
}
</script>
