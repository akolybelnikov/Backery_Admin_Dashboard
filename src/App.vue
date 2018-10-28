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

window.LOG_LEVEL = 'DEBUG'

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
:root {
    --amazonOrange: #52082d !important;
}
#app {
    font-family: 'Raleway', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    text-align: center;
    color: #331507;

    body {
        word-wrap: break-word;
        font-kerning: normal;
        -moz-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
        -ms-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
        -webkit-font-feature-settings: 'kern', 'liga', 'clig', 'calt';
        font-feature-settings: 'kern', 'liga', 'clig', 'calt';
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: inherit;
        text-rendering: optimizeLegibility;
        line-height: 1.2;
    }

    h1 {
        font-size: 2.25rem;
    }
    h2 {
        font-size: 1.62671rem;
    }
    h3 {
        font-size: 1.38316rem;
    }
    h4 {
        font-size: 1rem;
    }
    h5 {
        font-size: 0.85028rem;
    }
    h6 {
        font-size: 0.78405rem;
    }
    @media only screen and (max-width: 599px) {
        html {
            font-size: 100%;
        }
    }
}
</style>
