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
    status
    createdAt
    updatedAt
  }
}
`
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
      status
      createdAt
      updatedAt
    }
    nextToken
  }
}
`
export const getProductsTable = `query GetProductsTable($productId: String!, $category: String!) {
  getProductsTable(productId: $productId, category: $category) {
    category
    productId
  }
}
`;
export const listProductsTables = `query ListProductsTables(
  $filter: TableProductsTableFilterInput
  $limit: Int
  $nextToken: String
) {
  listProductsTables(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      category
      productId
    }
    nextToken
  }
}
`;
export const getCategory = `query GetCategory($title: String!) {
  getCategory(title: $title) {
    title
    name
    image
  }
}
`;
export const listCategories = `query ListCategories(
  $filter: TableCategoryFilterInput
  $limit: Int
  $nextToken: String
) {
  listCategories(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      title
      name
      image
    }
    nextToken
  }
}
`;
export const getFilling = `query GetFilling($title: String!) {
  getFilling(title: $title) {
    title
  }
}
`;
export const listFillings = `query ListFillings(
  $filter: TableFillingFilterInput
  $limit: Int
  $nextToken: String
) {
  listFillings(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      title
    }
    nextToken
  }
}
`
export const getNews = `query GetNews($id: ID!, $status: String!) {
  getNews(id: $id, status: $status) {
    id
    content
    image
    status
  }
}
`;
export const listNews = `query ListNews($filter: TableNewsFilterInput, $limit: Int, $nextToken: String) {
  listNews(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      image
      status
    }
    nextToken
  }
}
`
export const getOffer = `query GetOffer($id: ID!, $status: String!) {
  getOffer(id: $id, status: $status) {
    id
    content
    image
    status
  }
}
`
export const listOffers = `query ListOffers(
  $filter: TableOfferFilterInput
  $limit: Int
  $nextToken: String
) {
  listOffers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      content
      image
      status
    }
    nextToken
  }
}
`
