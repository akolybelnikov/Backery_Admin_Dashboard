<template>
    <div class="card">
        <div class="card-image">
            <icon-base 
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="#52082D"
                icon-name="cake">
                <icon-cake />
            </icon-base>
        </div>
        <div class="card-content">
            <p>{{ message }}</p>
        </div>
    </div>
</template>

<script lang='js'>
import IconBase from './IconBase.vue'
import IconCake from './icons/IconCake.vue'
export default {
    name: 'Created',
     components: {
        IconBase,
        IconCake
    },
    data() {
        return {
            message: ''
        }
    },
    created() {
        this.isCreated()
    },
    methods: {
        isCreated() {
            this.message = this.$route.params.message
        }
    }
}
</script>
