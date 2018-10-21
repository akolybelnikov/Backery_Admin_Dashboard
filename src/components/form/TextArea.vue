<template>
  <div class="field">
    <label class="label has-text-left">{{label}}</label>

    <div class="control">
        <textarea class="textarea is-success" rows="5" maxlength="256"
           :name="name"
           :value="value"
           @input="$emit('input', $event.target.value)"
           :placeholder="placeholder"
           :class="{ 'is-danger': errors && errors.length }"
           >
        </textarea>
        <span class="help is-fullwidth has-text-right is-primary">{{value.length}} / 256</span>
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
    name: 'TextArea',
    props: ['placeholder', 'label', 'name', 'value', 'errors']
}
</script>