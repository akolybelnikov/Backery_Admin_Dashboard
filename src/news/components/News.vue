<template>
    <div v-if="news.length">
        <b-table
            :data="news"
            :default-sort-direction="'desc'"
            default-sort="name"
            detailed
        >
            <template slot-scope="props">
                <b-table-column field="content" label="Содержание" sortable>
                    <span v-if="props.row.content">{{ props.row.content.substring(0, 101) }}</span>
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
                        <router-link class="button is-primary" :to="{name: 'UpdateNews', params: {id: props.row.id}}">
                            <span class="icon">
                            <i class="mdi mdi-chevron-right"></i>
                            </span>
                        </router-link>
                    </div>
                </article>
            </template>

        </b-table>
    </div>
    <div v-else>Новостей нет</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'News',
    data() {
        return {
            logger: {},
            url: process.env.VUE_APP_IMAGE_HANDLER_URL
        }
    },
    computed: {
        ...mapState(['news'])
    }
}
</script>
