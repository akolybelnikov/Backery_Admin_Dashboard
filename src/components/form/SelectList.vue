<template>
  <div class="field">
    <label class="label has-text-left">{{label}}</label>
      <div class="select is-fullwidth is-success" :class="{ 'is-danger': errors && errors.length, 'is-multiple': multi }">
        <select 
              :class="{ 'multi-select': multi }"
              :multiple="multi"
              :value="value"
              @input="$emit('input', $event.target.value)"
        >
          <option v-for="option in options"
                :key="option">
            {{ option }}
          </option>
        </select>
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
    name: 'SelectList',
    props: ['multi', 'options', 'name', 'label', 'value', 'errors']
}
</script>

<style lang="scss">
.select select, .control {
  color: #52082d;
}
</style>

