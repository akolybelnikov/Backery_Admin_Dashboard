<template>
    <nav class="navbar has-shadow" id="nav" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
          <img class="navbar-item" alt="bakery logo" src="../assets/logo-sm.png">
        </div>
        <div class="navbar-menu is-active">
          <div class="navbar-end">
            <router-link class="navbar-item" :class="{ 'router-link-exact-active': matched}" to="/">Панель управления</router-link>
            <div class="is-divider-vertical is-primary is-hidden-touch"></div>
            <router-link class="navbar-item" to="/products">Products</router-link>
            <div class="is-divider-vertical is-primary is-hidden-touch"></div>
            <amplify-sign-out class="navbar-item" v-if="user"></amplify-sign-out>
          </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'Menu',
    props: ['user'],
    data() {
        return {
            matched: false
        }
    },
    watch: {
        $route(to) {
            to.fullPath === '/products'
                ? (this.matched = false)
                : (this.matched = true)
        }
    },
    methods: {
        signOut: function() {
            this.$router.push('auth/')
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../_variables';
#nav {
    padding: 15px;
    img {
        max-width: 200px;
        @media screen and (max-width: 599px) {
            max-width: 130px;
            height: 70px;
        }
    }
    a {
        color: $primary-shadow;
        &.router-link-exact-active {
            color: $primary;
        }
    }
    .is-divider-vertical.is-primary {
        border-top-color: $primary;
        &::before {
            border-left-color: $primary;
        }
    }
}
</style>
