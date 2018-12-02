export const getProduct = `query GetProduct($productId: ID!, $category: String!) {
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
export const getCategory = `query GetCategory($name: String!) {
  getCategory(name: $name) {
    name
    image
    status
    title
    attachment
  }
}
`
export const listCategories = `query ListCategories {
  listCategories {
    items {
      name
      image
      status
      title
      attachment
    }
    nextToken
  }
}
`
export const getNews = `query GetNews($id: ID!) {
  getNews(id: $id) {
    id
    attachment
    createdAt
    image
    status
    content
  }
}
`
export const listNews = `query ListNews {
  listNews {
    items {
      id
      attachment
      createdAt
      image
      status
      content
    }
  }
}
`
export const getFilling = `query GetFilling($name: String!) {
  getFilling(name: $name) {
    name
    label
    image
    attachment
  }
}
`
export const listFillings = `query ListFillings {
  listFillings {
    items {
      name
      label
      image
      attachment
    }
  }
}
`
export const getOffer = `query GetOffer($id: ID!) {
  getOffer(id: $id) {
    id
    status
    content
    image
    attachment
  }
}
`
export const listOffers = `query ListOffers {
  listOffers {
    items {
      id
      status
      content
      image
      attachment
    }
  }
}
`
