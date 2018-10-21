<template>
  <div class="field">
    <label class="label has-text-left">{{label}}</label>

    <div class="control">
        <input class="input is-success" type="text"
           :name="name"
           :value="value"
           @input="$emit('input', $event.target.value)"
           :placeholder="placeholder"
           :class="{ 'is-danger': errors && errors.length }"
           >
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
    name: 'TextInput',
    props: ['placeholder', 'label', 'name', 'value', 'errors', 'hasAddOns']
}
</script>
