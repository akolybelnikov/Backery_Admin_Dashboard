<template>
    <div class="section">
      <div class="section is-centered columns">
        <div class="column is-full-mobile is-two-third-tablet">
          <form
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
                  <div class="control">
                      <input 
                        id="password"
                        name="password"
                        class="input"
                        v-model="password"
                        type="password"
                        minlength="8"
                        maxlength="30"
                        v-bind:class="{ 'is-danger': passwordErrors.length }"/>
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
        <div class="column is-one-third-tablet is-full-mobile">

        </div>
      </div>
    </div>
</template>


<script>
export default {
    name: 'ProductForm',
    data: function() {
        return {
            email: null,
            password: null,
            emailErrors: [],
            passwordErrors: [],
            loginErrors: []
        }
    }
}
</script>

<style lang="sass" scoped>

</style>
