// eslint-disable
// this is an auto generated file. This will be overwritten

const getProduct = `query GetProduct($productId: String!, $category: String!) {
  getProduct(productId: $productId, category: $category) {
    productId
    category
    attachment
    image
    weight
    price
    sorts
    upvotes
    comments
    productName
    content
    ingridients
    active
    createdAt
    updatedAt
    sort
  }
}
`
const listProducts = `query ListProducts(
  $filter: TableProductFilterInput
  $limit: Int
  $nextToken: String
) {
  listProducts(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      productId
      category
      attachment
      image
      weight
      price
      sorts
      upvotes
      comments
      productName
      content
      ingridients
      active
      createdAt
      updatedAt
      sort
    }
    nextToken
  }
}
`

export { getProduct, listProducts }
