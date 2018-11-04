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
export const createProductsTable = `mutation CreateProductsTable($input: CreateProductsTableInput!) {
  createProductsTable(input: $input) {
    category
    productId
  }
}
`;
export const updateProductsTable = `mutation UpdateProductsTable($input: UpdateProductsTableInput!) {
  updateProductsTable(input: $input) {
    category
    productId
  }
}
`;
export const deleteProductsTable = `mutation DeleteProductsTable($input: DeleteProductsTableInput!) {
  deleteProductsTable(input: $input) {
    category
    productId
  }
}
`;
export const createCategory = `mutation CreateCategory($input: CreateCategoryInput!) {
  createCategory(input: $input) {
    title
    name
    image
  }
}
`;
export const updateCategory = `mutation UpdateCategory($input: UpdateCategoryInput!) {
  updateCategory(input: $input) {
    title
    name
    image
  }
}
`;
export const deleteCategory = `mutation DeleteCategory($input: DeleteCategoryInput!) {
  deleteCategory(input: $input) {
    title
    name
    image
  }
}
`;
export const createFilling = `mutation CreateFilling($input: CreateFillingInput!) {
  createFilling(input: $input) {
    title
  }
}
`;
export const updateFilling = `mutation UpdateFilling($input: UpdateFillingInput!) {
  updateFilling(input: $input) {
    title
  }
}
`;
export const deleteFilling = `mutation DeleteFilling($input: DeleteFillingInput!) {
  deleteFilling(input: $input) {
    title
  }
}
`;
export const createNews = `mutation CreateNews($input: CreateNewsInput!) {
  createNews(input: $input) {
    id
    content
    image
    status
  }
}
`;
export const updateNews = `mutation UpdateNews($input: UpdateNewsInput!) {
  updateNews(input: $input) {
    id
    content
    image
    status
  }
}
`;
export const deleteNews = `mutation DeleteNews($input: DeleteNewsInput!) {
  deleteNews(input: $input) {
    id
    content
    image
    status
  }
}
`;
export const createOffer = `mutation CreateOffer($input: CreateOfferInput!) {
  createOffer(input: $input) {
    id
    content
    image
    status
  }
}
`;
export const updateOffer = `mutation UpdateOffer($input: UpdateOfferInput!) {
  updateOffer(input: $input) {
    id
    content
    image
    status
  }
}
`;
export const deleteOffer = `mutation DeleteOffer($input: DeleteOfferInput!) {
  deleteOffer(input: $input) {
    id
    content
    image
    status
  }
}
`;
