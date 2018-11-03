// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateProduct = `subscription OnCreateProduct($productId: String, $category: String) {
  onCreateProduct(productId: $productId, category: $category) {
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
  }
}
`;
export const onUpdateProduct = `subscription OnUpdateProduct($productId: String, $category: String) {
  onUpdateProduct(productId: $productId, category: $category) {
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
    updatedAt
  }
}
`;
export const onDeleteProduct = `subscription OnDeleteProduct($productId: String) {
  onDeleteProduct(productId: $productId) {
    productId
  }
}
`;
