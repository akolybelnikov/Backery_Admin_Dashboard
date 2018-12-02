<template>
  <div v-if="products && products.length">
    <b-table
      :data="products"
      :paginated="isPaginated"
      :per-page="perPage"
      :current-page.sync="currentPage"
      :pagination-simple="isPaginationSimple"
      :default-sort-direction="defaultSortDirection"
      default-sort="productName"
      detailed
    >
      <template slot-scope="props">
        <b-table-column field="productName" label="Название" sortable>
          <span v-if="props.row.productName">{{ props.row.productName }}</span>
        </b-table-column>
        <b-table-column field="createdAt" label="Дата создания" sortable centered>
          <span
            v-if="props.row.createdAt"
            class="tag is-success"
          >{{ Number(props.row.createdAt) | moment("DD.MM.YYYY") }}</span>
        </b-table-column>
        <b-table-column field="updatedAt" label="Дата обновления" sortable centered>
          <span
            class="tag is-success"
            v-if="props.row.updatedAt"
          >{{ Number(props.row.updatedAt) | moment("DD.MM.YYYY") }}</span>
        </b-table-column>
        <b-table-column field="status" label="Статус" sortable centered>{{ props.row.status }}</b-table-column>
      </template>

      <template slot="detail" slot-scope="props">
        <article class="media">
          <figure
            v-if="props.row.image"
            :style="`background: center / cover url(${url}/64x64/public/${props.row.image}) white`"
            class="image is-64x64 media-left"
          ></figure>
          <div class="media-content">
            <div class="content">
              <p v-if="props.row.content">
                {{ props.row.content.substring(0, 101) }}
                <span
                  v-if="props.row.content.lenght > 100"
                >...</span>
              </p>
            </div>
          </div>
          <div class="media-right">
            <p v-if="props.row.weight">
              <strong>{{ props.row.weight }}</strong>
            </p>
            <p v-if="props.row.price">
              <strong>{{ props.row.price }}</strong>
            </p>
            <br>
            <router-link
              class="button is-primary"
              :to="{name: 'UpdateProduct', params: {id: props.row.productId, category: props.row.category}}"
            >
              <span class="icon">
                <i class="mdi mdi-chevron-right"></i>
              </span>
            </router-link>
          </div>
        </article>
      </template>
    </b-table>
  </div>
  <div v-else>Продуктов нет</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'ProductsCategory',
    data() {
        return {
            isPaginated: true,
            isPaginationSimple: false,
            defaultSortDirection: 'asc',
            currentPage: 1,
            perPage: 10,
            url: process.env.VUE_APP_IMAGE_HANDLER_URL
        }
    },
    computed: mapState({
        products(state) {
            return state.products[this.$route.params.category]
        }
    })
}
</script>
