import { productService } from '../services'

const state = {
    all: {}
}

const actions = {
    listAll({ commit }, { filter, limit, nt }) {
        commit('listAllRequest')

        productService
            .listAll(filter, limit, nt)
            .then(
                products => commit('listAllSuccess', products),
                error => commit('listAllFailure', error)
            )
    }
}

const mutations = {
    listAllRequest(state) {
        state.all = { loading: true }
    },
    listAllSuccess(state, products) {
        state.all = { products: products }
    },
    listAllFailure(state, error) {
        state.all = { error }
    }
}

export const products = {
    namespaced: true,
    state,
    actions,
    mutations
}
