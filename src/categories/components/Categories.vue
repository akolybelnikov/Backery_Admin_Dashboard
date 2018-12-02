<template>
  <div v-if="categories.length">
    <b-table :data="categories" :default-sort-direction="'desc'" default-sort="name">
      <template slot-scope="props">
        <b-table-column field="image" label="Изображение">
          <figure
            v-if="props.row.image"
            :style="`background: center / cover url(${url}/64x64/public/${props.row.image}) white`"
            class="image is-64x64 media-left"
          ></figure>
        </b-table-column>
        <b-table-column field="title" label="Название" sortable>
          <span v-if="props.row.title">{{ props.row.title }}</span>
        </b-table-column>
        <b-table-column field="status" label="Статус" sortable centered>
          <article class="media">
            <div class="media-content">
              <div class="content">
                <span v-if="props.row.status">{{ props.row.status }}</span>
              </div>
            </div>
            <div class="media-right">
              <router-link
                class="button is-primary"
                :to="{name: 'UpdateCategory', params: {name: props.row.name}}"
              >
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
  <div v-else>Категорий нет</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'Categories',
    data() {
        return {
            logger: {},
            url: process.env.VUE_APP_IMAGE_HANDLER_URL
        }
    },
    computed: {
        ...mapState(['categories'])
    }
}
</script>
<style lang="scss">
@import '../../_variables.scss';
.b-table .table tr.detail {
    background: $success-shadow;
    box-shadow: inset 0 1px 3px $success;
    color: $info;
}
.table {
    color: $primary;
}
</style>
