<template>
    <div class="container">
      <div v-bind:style="{height: '100vh'}" class="section is-centered is-vcentered is-flex columns">
        <div class="column is-three-quarters-mobile is-two-thirds-tablet is-half-desktop is-one-third-widescreen is-one-quarter-fullhd">
          <form
            action=""
            @submit.prevent="checkForm">
              <div class="field">
                  <label class="label">Email</label>
                  <div class="control">
                      <input 
                        id="email"
                        class="input" 
                        v-model="email"
                        type="email"
                        name="email"
                        maxlength="30"
                        v-bind:class="{ 'is-danger': emailErrors.length }"/>
                  </div>
                  <p v-if="emailErrors.length" class="help is-danger">
                      <ul>
                      <li v-for="(error, index) in emailErrors" :key='index'>{{ error }}</li>
                      </ul>
                  </p>
              </div>
              <div class="field">
                  <label class="label">Password</label>
                  <div class="control has-icons-right">
                      <input 
                        ref="password"
                        id="password"
                        name="password"
                        class="input"
                        v-model="password"
                        type="password"
                        minlength="8"
                        maxlength="30"
                        v-bind:class="{ 'is-danger': passwordErrors.length }"/>
                        <span @click="clickedIcon" class="icon has-text-primary is-right">
                          <i class="fas fa-eye"></i>
                        </span>
                  </div>
                  <p class="help is-danger" v-if="passwordErrors.length">
                      <ul>
                      <li v-for="(error, index) in passwordErrors" :key='index'>{{ error }}</li>
                      </ul>
                  </p>
              </div>  
              <div class="field">
                <div class="control has-text-centered">
                    <input class="button is-primary is-outlined" type="submit" value="Submit">
                </div>
                <p class="help is-danger" v-if="loginErrors.length">
                      <ul>
                      <li v-for="(error, index) in loginErrors" :key='index'>{{ error }}</li>
                      </ul>
                  </p>
              </div> 
          </form>    
        </div>
      </div>
    </div>
</template>

<script lang='js'>
import Vue from 'vue'
import store from '../store/store'
import { AmplifyEventBus } from 'aws-amplify-vue'

export default {
  name: 'Login',
  data: function() {
    return {
      email: null,
      password: null,
      emailErrors: [],
      passwordErrors: [],
      loginErrors: []
    }
  },
  methods: {

    checkForm: function() {
      this.emailErrors = []
      this.passwordErrors = []

      if (!this.email) {
        this.emailErrors.push('Email required.')
      } else if (!this.validEmail(this.email)) {
        this.emailErrors.push('Valid email required.');
      }
      if (!this.password) {
        this.passwordErrors.push('Password required.')
      }
      if (!this.emailErrors.length && !this.passwordErrors.length) {
        this.login(this.email, this.password)
      }
    },

    validEmail: function (email) {
      // eslint-disable-next-line
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },

    login: function(email, password) {
      this.loginErrors = []
      return Vue.prototype.$Amplify.Auth.signIn(email, password)
          .then(data => {
              if (data && data.signInUserSession) {
                  store.commit('setUser', data)
                  AmplifyEventBus.$emit('authState', 'signedIn')
                  return data
              }
          })
          .catch(() => {
            this.loginErrors.push('Invalid username and/or password')
              store.commit('setUser', null)
              return null
          })
    },
    clickedIcon: function() {
      this.$refs.password.attributes.type.value === 'password' ?
        this.$refs.password.attributes.type.value = "text" :
        this.$refs.password.attributes.type.value = "password"
    }
  }
}
</script>

<style scoped lang='scss'>
.icon {
    cursor: pointer;
    pointer-events: all;
}
</style>
