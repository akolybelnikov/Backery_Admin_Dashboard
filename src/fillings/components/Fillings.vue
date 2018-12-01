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
                <b-table-column field="name" label="Английское название">
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
import { ListFillings } from '../graphql'

export default {
    name: 'Fillings',
    data() {
        return {
            fillings: [],
            logger: {},
            queries: {
                list: ListFillings
            },
            url: process.env.VUE_APP_IMAGE_HANDLER_URL
        }
    },
    created() {
        this.logger = new this.$Amplify.Logger('Offers_component')
        this.listFillings()
    },
    methods: {
        async listFillings() {
            try {
                const response = await this.$Amplify.API.graphql(
                    this.$Amplify.graphqlOperation(this.queries.list, {})
                )
                this.fillings = response.data.listFillings.items
                if (this.fillings.length) {
                    this.$store.commit({
                        type: 'setFillings',
                        items: response.data.listFillings.items
                    })
                }
            } catch (err) {
                this.logger.error(`Error listing fillings: `, err)
            }
        }
    }
}
</script>
