// eslint-disable
// this is an auto generated file. This will be overwritten

export const getProduct = `query GetProduct($productId: String!, $category: String!) {
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
  }
}
`;
export const listProducts = `query ListProducts(
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
    }
    nextToken
  }
}
`;
