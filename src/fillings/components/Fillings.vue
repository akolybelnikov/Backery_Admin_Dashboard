<template>
    <div v-if="fillings.length">
        <b-table
            :data="fillings"
            :default-sort-direction="'desc'"
            default-sort="label"
        >
            <template slot-scope="props">
                <b-table-column field="image" label="Изображение">
                    <figure v-if="props.row.image" :style="`background: center / cover url(${url}/64x64/public/${props.row.image}) white`" class="image is-64x64 media-left"></figure>
                </b-table-column>
                <b-table-column field="name" label="Английское название" sortable>
                    {{ props.row.name }}
                </b-table-column>
                <b-table-column field="label" label="Название" sortable>
                    <article class="media">
                        <div class="media-content">
                            <div class="content">
                                <p>{{ props.row.label }}</p>
                            </div>
                        </div>
                        <div class="media-right">
                            <router-link class="button is-primary" :to="{name: 'UpdateFilling', params: {name: props.row.name}}">
                                <span class="icon">
                                <i class="mdi mdi-chevron-right"></i>
                                </span>
                            </router-link>
                        </div>
                    </article>
                </b-table-column>
            </template>
        </b-table>
    </div>
    <div v-else>Начинок нет</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Fillings',
    data() {
        return {
            logger: {},
            url: process.env.VUE_APP_IMAGE_HANDLER_URL
        }
    },
    computed: {
        ...mapState(['fillings'])
    }
}
</script>
