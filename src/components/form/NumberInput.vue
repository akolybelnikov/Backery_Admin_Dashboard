<template>
  <div class="field">
    <label class="label has-text-left">{{label}}</label>
    <div class="control">
      <div class="field has-addons">
        <p class="control is-expanded">
          <input class="input is-success"
            step=".01"
            type="number"
            :name="name"
            :value="value"
            @input="$emit('input', $event.target.value)"
            :placeholder="placeholder">
        </p>
        <p class="control">
          <a class="button is-success">
            <span v-if="name === 'price'">Руб.</span>
          </a>
        </p>
      </div>
    </div>
    <p v-if="errors && errors.length" class="help is-danger has-text-left">
        <ul>
            <li v-for="(error, index) in errors" :key='index'>{{ error }}</li>
        </ul>
    </p>

  </div>
</template>
<script>
export default {
    name: 'NumberInput',
    props: ['placeholder', 'label', 'name', 'value', 'errors']
}
</script>

<style lang="scss" scoped>
@import '../../_variables';
a.button.is-success {
    color: $primary;
}
</style>
