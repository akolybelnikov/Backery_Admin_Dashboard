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
      }
      nextToken
    }
  }
  `

const createProduct = `mutation CreateProduct($input: CreateProductInput!) {
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
    }
  }
  `
const updateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
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
    }
  }
  `
const deleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
    deleteProduct(input: $input) {
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
    }
  }
  `
export { listProducts, getProduct, updateProduct, deleteProduct, createProduct }
