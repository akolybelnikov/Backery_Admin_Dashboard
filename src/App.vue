<template>
  <div class="container is-fluid" id="app">
    <v-menu v-bind:user="user" v-if="user" />
    <router-view/>
  </div>
</template>

<script>
import Vue from 'vue'
import Menu from '@/components/Menu'
import { mapState } from 'vuex'

Vue.component('v-menu', Menu)

// window.LOG_LEVEL = 'DEBUG'

export default {
    name: 'app',
    computed: {
        ...mapState({
            user: state => state.user
        })
    }
}
</script>


<style lang="scss">
@import './_bulma';
#app {
    font-family: 'Raleway', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
