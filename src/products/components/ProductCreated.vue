<template>
    <p v-if="productIsCreated">Product created!</p>
    <p v-else>First create a product ....</p>
</template>

<script lang='js'>
export default {
    name: 'ProductCreated',
    data() {
        return {
            productIsCreated: false
        }
    },
    created() {
        this.isCreated()
    },
    methods: {
        isCreated() {
            if (this.$route.params.isCreated) this.productIsCreated = true
        }
    }
}
</script>
