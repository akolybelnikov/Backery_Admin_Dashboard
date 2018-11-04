const GetProduct = `query GetProduct($productId: String!, $category: String!) {
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
    status
    createdAt
    updatedAt
  }
}
`
const ListProducts = `query ListProducts(
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
      status
      createdAt
      updatedAt
    }
    nextToken
  }
}
`
const CreateProduct = `mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
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
    status
    createdAt
  }
}
`
const UpdateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
  updateProduct(input: $input) {
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
    status
    updatedAt
  }
}
`
const DeleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
  deleteProduct(input: $input) {
    productId
    category
  }
}
`
export { ListProducts, GetProduct, UpdateProduct, DeleteProduct, CreateProduct }
