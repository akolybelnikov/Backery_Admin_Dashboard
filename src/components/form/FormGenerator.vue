<template>
  <div class="field">
    <component v-for="(field, index) in schema"
               :key="index"
               :is="field.fieldType"
               :value="formData[field.name]"
               :errors="errors[field.name]"
               @input="updateForm(field.name, $event)"
               v-bind="field">
    </component>
  </div>
</template>

<script>
import NumberInput from './NumberInput'
import SelectList from './SelectList'
import TextInput from './TextInput'
import TextArea from './TextArea'
export default {
    name: 'FormGenerator',
    components: { NumberInput, SelectList, TextInput, TextArea },
    props: ['schema', 'value', 'errors'],
    data() {
        return {
            formData: this.value || {}
        }
    },
    methods: {
        updateForm(fieldName, value) {
            this.$set(this.formData, fieldName, value)
            this.$emit('input', this.formData, fieldName, value)
        }
    }
}
</script>
