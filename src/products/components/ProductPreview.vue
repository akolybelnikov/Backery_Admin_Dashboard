<template>
    <div class="card">
        <header class="card-header">
            <p class="card-header-title">{{  title }}</p>
        </header>
        <div class="card-image">
            <button v-if="src" @click="$emit('click', $event)" class="delete is-large"></button>
            <div class="background-image" :style="{ background: `center / cover no-repeat url(${src})`}"></div>
        </div>
        <div class="card-content">
            <div class="content has-text-left">
                <p>{{ description }}</p>
            </div>
            <div class="is-divider is-primary"></div>
            <div class="content has-text-left">
                <b>Состав продукта:</b> {{ ingridients }}
            </div>
            <div v-if="sorts && sorts.length" class="content">
                <p class="tags">
                    <span style="margin-right: 10px"><b>Начинки:</b></span>
                    <span v-if="sort !== ''" v-for="sort in sorts" :key="sort" class="tag is-success">{{ sort }}</span>
                </p>
            </div> 
        </div>
        <footer class="card-footer">
            <p class="card-footer-item">{{ price }} Руб.</p>
            <p class="card-footer-item">{{ weight }}</p>
            <a class="card-footer-item"><button class="button is-primary">Заказать</button></a>
        </footer>
    </div>
</template>


<script lang='js'>
export default {
    name: 'ProductPreview',
    props: ['title', 'src', 'description', 'ingridients', 'sorts', 'price', 'weight']
}
</script>

<style lang="scss" scoped>
@import '../../_variables';
.card-image {
    .background-image {
        margin: 0 auto;
        height: 400px;
        width: 400px;
        @media screen and (max-width: 320px) {
            height: 250px;
            width: 250px;
        }
    }
    button {
        position: absolute;
        right: 0;
        top: 0;
    }
}
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
