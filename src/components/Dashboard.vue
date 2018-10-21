<template>
    <div class="container is-fluid">
        <main class="section">
            <div class="columns is-multiline is-centered">
            <div class="column create-card is-one-quarter-fullhd">
                    <div class="card">
                        <div class="card-image">
                            <icon-base 
                                width="100"
                                height="100"
                                fill="#52082D"
                                icon-name="create">
                                <icon-create />
                            </icon-base>
                        </div>
                        <div class="card-content">
                            <div class="dropdown is-hoverable">
                                <div class="dropdown-trigger">
                                    <button class="button is-primary" aria-haspopup="true" aria-controls="dropdown-menu4">
                                        <span>Создать</span>
                                        <span class="icon is-small">
                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                                    <div class="dropdown-content">
                                        <router-link to="create-product" class="dropdown-item">
                                            <h4>Продукт</h4>
                                        </router-link>
                                        <hr class="dropdown-divider">
                                        <router-link to="create-offer" class="dropdown-item">
                                            <h4>Спецпредложение</h4>
                                        </router-link>
                                        <hr class="dropdown-divider">
                                        <router-link to="create-news" class="dropdown-item">
                                            <h4>Новость</h4>
                                        </router-link>
                                        <hr class="dropdown-divider">
                                        <router-link to="create-category" class="dropdown-item">
                                            <h4>Категорию</h4>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
                <div class="column is-full form-card">
                    <router-view></router-view>
                </div>
                <div class="column edit-card is-one-quarter-fullhd">
                    <div class="card">
                        <div class="card-image">
                            <icon-base 
                                width="100"
                                height="100"
                                fill="#52082d"
                                icon-name="edit">
                                    <icon-edit />
                            </icon-base>
                        </div>
                        <div class="card-content">
                            <div class="dropdown is-hoverable">
                                <div class="dropdown-trigger">
                                    <button class="button is-primary" aria-haspopup="true" aria-controls="dropdown-menu4">
                                        <span>Изменить</span>
                                        <span class="icon is-small">
                                            <i class="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                <div class="dropdown-menu" id="dropdown-menu4" role="menu">
                                    <div class="dropdown-content">
                                        <router-link to="#" class="dropdown-item">
                                            <h4>Продукт</h4>
                                        </router-link>
                                        <hr class="dropdown-divider">
                                        <router-link to="#" class="dropdown-item">
                                            <h4>Спецпредложение</h4>
                                        </router-link>
                                        <hr class="dropdown-divider">
                                        <router-link to="#" class="dropdown-item">
                                            <h4>Новость</h4>
                                        </router-link>
                                        <hr class="dropdown-divider">
                                        <router-link to="#" class="dropdown-item">
                                            <h4>Категорию</h4>
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import IconBase from './IconBase.vue'
import IconCreate from './icons/IconCreate.vue'
import IconEdit from './icons/IconEdit.vue'
export default {
    name: 'Dashboard',
    components: {
        IconBase,
        IconCreate,
        IconEdit
    }
}
</script>

<style scoped>
.create-card {
    order: 1;
}
.edit-card {
    order: 2;
}
.form-card {
    order: 3;
}
.card-image {
    padding-top: 20px;
}
</style>
