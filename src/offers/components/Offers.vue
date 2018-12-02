<template>
    <div v-if="offers.length">
        <b-table
            :data="offers"
            :default-sort-direction="'desc'"
            default-sort="status"
            detailed
        >
            <template slot-scope="props">
                <b-table-column field="content" label="Содержание" sortable>
                    {{ props.row.content.substring(0, 101) }}
                </b-table-column>
                <b-table-column field="status" label="Статус" sortable centered>
                    {{ props.row.status }}
                </b-table-column>
            </template>

            <template slot="detail" slot-scope="props">
                <article class="media">
                    <figure v-if="props.row.image" :style="`background: center / cover url(${url}/64x64/public/${props.row.image}) white`" class="image is-64x64 media-left"></figure>
                    <div class="media-content">
                        <div class="content">
                            <p v-if="props.row.content">{{ props.row.content }}</p>
                        </div>
                    </div>
                    <div class="media-right">
                        <router-link class="button is-primary" :to="{name: 'UpdateOffer', params: {id: props.row.id, status: props.row.status}}">
                            <span class="icon">
                            <i class="mdi mdi-chevron-right"></i>
                            </span>
                        </router-link>
                    </div>
                </article>
            </template>

        </b-table>
    </div>
    <div v-else>Специальных предложений нет</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Offers',
    data() {
        return {
            logger: {},
            url: process.env.VUE_APP_IMAGE_HANDLER_URL
        }
    },
    computed: {
        ...mapState(['offers'])
    }
}
</script>
