<template>
  <div>
    <div v-if="!filling && !category" class="card">
      <header v-if="title" class="card-header">
        <p class="card-header-title">{{ title }}</p>
      </header>
      <div class="card-image">
        <figure :style="`background: center / cover url(${src}) white`" class="image is-square"></figure>
      </div>
      <div v-if="product" class="card-content">
        <div v-if="description" class="content has-text-left">
          <p>{{ description }}</p>
        </div>
        <div class="is-divider is-primary"></div>
        <div v-if="ingridients" class="content has-text-left">
          <b>Состав продукта:</b>
          {{ ingridients }}
        </div>
        <div v-if="sorts && sorts.length" class="content">
          <p class="tags">
            <span style="margin-right: 10px">
              <b>Начинки:</b>
            </span>
            <span
              v-if="sort !== ''"
              v-for="sort in sorts"
              :key="sort"
              class="tag is-success"
            >{{ sort }}</span>
          </p>
        </div>
      </div>
      <footer v-if="product" class="card-footer">
        <p class="card-footer-item">{{ price }} Руб.</p>
        <p class="card-footer-item">{{ weight }}</p>
        <a class="card-footer-item">
          <button class="button is-primary">Заказать</button>
        </a>
      </footer>
      <div v-if="news" class="card-content">
        <div v-if="content" class="content has-text-left">
          <p>{{ content }}</p>
        </div>
      </div>
    </div>
    <article v-else class="media">
      <figure :style="`background: center / cover url(${src}) white`" class="image is-128x128 media-left"></figure>
      <div class="media-content">
        <div class="content">
          <p>{{ title }}</p>
        </div>
      </div>
    </article>
  </div>
</template>

<script lang='js'>
export default {
    name: 'Preview',
    props: [
        'title',
        'src',
        'description',
        'ingridients',
        'sorts',
        'price',
        'weight',
        'product',
        'category',
        'news',
        'offer',
        'filling',
        'content'
    ]
}
</script>

<style lang="scss" scoped>
@import '../_variables';
span.tag {
    color: $primary;
    font-weight: 600;
}
.is-divider.is-primary {
    border-top-color: $primary;
    &::before {
        border-left-color: $primary;
    }
}
</style>
