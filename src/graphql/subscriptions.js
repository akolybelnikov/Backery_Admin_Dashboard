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
    status
    createdAt
    updatedAt
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
    status
    createdAt
    updatedAt
  }
}
`;
export const onDeleteProduct = `subscription OnDeleteProduct($productId: String) {
  onDeleteProduct(productId: $productId) {
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
`;
export const onCreateProductsTable = `subscription OnCreateProductsTable($category: String, $productId: String) {
  onCreateProductsTable(category: $category, productId: $productId) {
    category
    productId
  }
}
`;
export const onUpdateProductsTable = `subscription OnUpdateProductsTable($category: String, $productId: String) {
  onUpdateProductsTable(category: $category, productId: $productId) {
    category
    productId
  }
}
`;
export const onDeleteProductsTable = `subscription OnDeleteProductsTable($category: String, $productId: String) {
  onDeleteProductsTable(category: $category, productId: $productId) {
    category
    productId
  }
}
`;
export const onCreateCategory = `subscription OnCreateCategory($title: String) {
  onCreateCategory(title: $title) {
    title
    name
    image
  }
}
`;
export const onUpdateCategory = `subscription OnUpdateCategory($title: String) {
  onUpdateCategory(title: $title) {
    title
    name
    image
  }
}
`;
export const onDeleteCategory = `subscription OnDeleteCategory($title: String) {
  onDeleteCategory(title: $title) {
    title
    name
    image
  }
}
`;
export const onCreateFilling = `subscription OnCreateFilling($title: String) {
  onCreateFilling(title: $title) {
    title
  }
}
`;
export const onUpdateFilling = `subscription OnUpdateFilling($title: String) {
  onUpdateFilling(title: $title) {
    title
  }
}
`;
export const onDeleteFilling = `subscription OnDeleteFilling($title: String) {
  onDeleteFilling(title: $title) {
    title
  }
}
`;
export const onCreateNews = `subscription OnCreateNews(
  $id: ID
  $content: String
  $image: String
  $status: String
) {
  onCreateNews(id: $id, content: $content, image: $image, status: $status) {
    id
    content
    image
    status
  }
}
`;
export const onUpdateNews = `subscription OnUpdateNews(
  $id: ID
  $content: String
  $image: String
  $status: String
) {
  onUpdateNews(id: $id, content: $content, image: $image, status: $status) {
    id
    content
    image
    status
  }
}
`;
export const onDeleteNews = `subscription OnDeleteNews(
  $id: ID
  $content: String
  $image: String
  $status: String
) {
  onDeleteNews(id: $id, content: $content, image: $image, status: $status) {
    id
    content
    image
    status
  }
}
`;
export const onCreateOffer = `subscription OnCreateOffer(
  $id: ID
  $content: String
  $image: String
  $status: String
) {
  onCreateOffer(id: $id, content: $content, image: $image, status: $status) {
    id
    content
    image
    status
  }
}
`;
export const onUpdateOffer = `subscription OnUpdateOffer(
  $id: ID
  $content: String
  $image: String
  $status: String
) {
  onUpdateOffer(id: $id, content: $content, image: $image, status: $status) {
    id
    content
    image
    status
  }
}
`;
export const onDeleteOffer = `subscription OnDeleteOffer(
  $id: ID
  $content: String
  $image: String
  $status: String
) {
  onDeleteOffer(id: $id, content: $content, image: $image, status: $status) {
    id
    content
    image
    status
  }
}
`;
