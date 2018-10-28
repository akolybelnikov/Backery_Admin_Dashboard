import listProducts from '../graphql/queries'
import Vue from 'vue'

export const productService = {
    listAll
    // getById,
    // update,
    // delete: _delete
}

function listAll(filter, limit, nt) {
    Vue.prototype.$Amplify.API.graphql(
        Vue.prototype.$Amplify.graphqlOperation(listProducts, {
            filter: { eq: filter },
            limit: limit,
            nt: nt
        })
    )
    // .then(res => {
    //     this.products = res.data.listProducts.items
    //     this.logger.info(`Products successfully listed: `, res.data)
    // })
    // .catch(e => {
    //     this.logger.error(`Error listing products: `, e)
    // })
}

// function getById(id) {
//     const requestOptions = {
//         method: 'GET',
//         headers: authHeader()
//     }

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
//         handleResponse
//     )
// }

// function update(user) {
//     const requestOptions = {
//         method: 'PUT',
//         headers: {
//             ...authHeader(),
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(user)
//     }

//     return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(
//         handleResponse
//     )
// }

// function _delete(id) {
//     const requestOptions = {
//         method: 'DELETE',
//         headers: authHeader()
//     }

//     return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
//         handleResponse
//     )
// }
