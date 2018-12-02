// eslint-disable
// this is an auto generated file. This will be overwritten

export const createProduct = `mutation CreateProduct($input: CreateProductInput!) {
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
    updatedAt
  }
}
`
export const updateProduct = `mutation UpdateProduct($input: UpdateProductInput!) {
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
    createdAt
    updatedAt
  }
}
`
export const deleteProduct = `mutation DeleteProduct($input: DeleteProductInput!) {
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
    status
    createdAt
    updatedAt
  }
}
`
export const createCategory = `mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    name
    image
    status
    title
    attachment
  }
}
`
export const updateCategory = `mutation UpdateCategory($input: UpdateCategoryInput!) {
  updateCategory(input: $input) {
    name
    image
    status
    title
    attachment
  }
}
`
export const deleteCategory = `mutation DeleteCategory($input: DeleteCategoryInput!) {
  deleteCategory(input: $input) {
    name
    image
    status
    title
    attachment
  }
}
`
export const createNews = `mutation CreateNews($input: CreateNewsInput!) {
  createNews(input: $input) {
    id
    attachment
    createdAt
    image
    status
    content
  }
}
`
export const updateNews = `mutation UpdateNews($input: UpdateNewsInput!) {
  updateNews(input: $input) {
    id
    attachment
    createdAt
    image
    status
    content
  }
}
`
export const deleteNews = `mutation DeleteNews($input: DeleteNewsInput!) {
  deleteNews(input: $input) {
    id
    attachment
    createdAt
    image
    status
    content
  }
}
`
export const createFilling = `mutation CreateFilling($input: CreateFillingInput!) {
  createFilling(input: $input) {
    name
    label
    image
    attachment
  }
}
`
export const updateFilling = `mutation UpdateFilling($input: UpdateFillingInput!) {
  updateFilling(input: $input) {
    name
    label
    image
    attachment
  }
}
`
export const deleteFilling = `mutation DeleteFilling($input: DeleteFillingInput!) {
  deleteFilling(input: $input) {
    name
    label
    image
    attachment
  }
}
`
export const createOffer = `mutation CreateOffer($input: CreateOfferInput!) {
  createOffer(input: $input) {
    id
    status
    content
    image
    attachment
  }
}
`
export const updateOffer = `mutation UpdateOffer($input: UpdateOfferInput!) {
  updateOffer(input: $input) {
    id
    status
    content
    image
    attachment
  }
}
`
export const deleteOffer = `mutation DeleteOffer($input: DeleteOfferInput!) {
  deleteOffer(input: $input) {
    id
    status
    content
    image
    attachment
  }
}
`
