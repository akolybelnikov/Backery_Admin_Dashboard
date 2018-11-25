<template>
    <div v-if="news">
        <b-table
            :data="news"
            :default-sort-direction="'desc'"
            default-sort="name"
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
                    <figure class="media-left">
                        <p class="image is-64x64">
                            <img v-if="props.row.image" :src="`${url}/64x64/public/${props.row.image}`">
                        </p>
                    </figure>
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
import { ListNews } from '../graphql'

export default {
    name: 'News',
    data() {
        return {
            news: [],
            logger: {},
            actions: {
                list: ListNews
            },
            url: process.env.VUE_APP_IMAGE_HANDLER_URL
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('News_component')
        this.listNews()
    },
    methods: {
        async listNews() {
            try {
                const response = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.actions.list, {})
                )
                this.news = response.data.listNews.items
                this.$store.commit({
                    type: 'setNews',
                    items: response.data.listNews.items
                })
            } catch (err) {
                this.logger.error(`Error listing news: `, err)
            }
        }
    }
}
</script>
