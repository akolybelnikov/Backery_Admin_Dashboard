<template>
    <div><p>products</p></div>
</template>

<script>
// import Vue from 'vue'
import store from '../../store/store'

// import getProduct from './persist/graphqlActions'
// import listProducts from './persist/graphqlActions'
// import createProduct from './persist/graphqlActions'
// import updateProduct from './persist/graphqlActions'
// import deleteProduct from './persist/graphqlActions'

export default {
    name: 'Produts',
    data() {
        return {
            products: [],
            filter: 'all',
            limit: 1000,
            logger: {},
            actions: {
                // create: createProduct,
                list: listProducts
                // update: updateProduct,
                // delete: deleteProduct
            }
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('PRODUCTS_component')
        this.list()
    },
    computed: {
        userId: function() {
            return store.state.userId
        }
    },
    methods: {
        list() {
            this.$Amplify.API.graphql(
                this.$Amplify.graphqlOperation(listProducts)
            )
                .then(res => {
                    this.products = res.data.listProducts.items
                    this.logger.info(`Products successfully listed: `)
                })
                .catch(e => {
                    this.logger.error(`Error listing products: `, e)
                })
        }
    }
}

const listProducts = `query ListProducts(
    $filter: TableProductFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        productId
        category
        attachment
        image
        weight
        price
        sorts
        upvotes
        comments
        productName
        content
        ingridients
      }
      nextToken
    }
  }
  `
</script>
