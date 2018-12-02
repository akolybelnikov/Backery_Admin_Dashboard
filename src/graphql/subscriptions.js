// eslint-disable
// this is an auto generated file. This will be overwritten

export const onCreateProduct = `subscription OnCreateProduct(
  $productId: String
  $category: String
  $attachment: String
  $image: String
  $weight: String
) {
  onCreateProduct(
    productId: $productId
    category: $category
    attachment: $attachment
    image: $image
    weight: $weight
  ) {
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
export const onUpdateProduct = `subscription OnUpdateProduct(
  $productId: String
  $category: String
  $attachment: String
  $image: String
  $weight: String
) {
  onUpdateProduct(
    productId: $productId
    category: $category
    attachment: $attachment
    image: $image
    weight: $weight
  ) {
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
export const onDeleteProduct = `subscription OnDeleteProduct(
  $productId: String
  $category: String
  $attachment: String
  $image: String
  $weight: String
) {
  onDeleteProduct(
    productId: $productId
    category: $category
    attachment: $attachment
    image: $image
    weight: $weight
  ) {
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
export const onCreateCategory = `subscription OnCreateCategory(
  $name: String
  $image: String
  $status: String
  $title: String
  $attachment: String
) {
  onCreateCategory(
    name: $name
    image: $image
    status: $status
    title: $title
    attachment: $attachment
  ) {
    name
    image
    status
    title
    attachment
  }
}
`;
export const onUpdateCategory = `subscription OnUpdateCategory(
  $name: String
  $image: String
  $status: String
  $title: String
  $attachment: String
) {
  onUpdateCategory(
    name: $name
    image: $image
    status: $status
    title: $title
    attachment: $attachment
  ) {
    name
    image
    status
    title
    attachment
  }
}
`;
export const onDeleteCategory = `subscription OnDeleteCategory(
  $name: String
  $image: String
  $status: String
  $title: String
  $attachment: String
) {
  onDeleteCategory(
    name: $name
    image: $image
    status: $status
    title: $title
    attachment: $attachment
  ) {
    name
    image
    status
    title
    attachment
  }
}
`;
export const onCreateNews = `subscription OnCreateNews(
  $id: String
  $attachment: String
  $createdAt: String
  $image: String
  $status: String
) {
  onCreateNews(
    id: $id
    attachment: $attachment
    createdAt: $createdAt
    image: $image
    status: $status
  ) {
    id
    attachment
    createdAt
    image
    status
    content
  }
}
`;
export const onUpdateNews = `subscription OnUpdateNews(
  $id: String
  $attachment: String
  $createdAt: String
  $image: String
  $status: String
) {
  onUpdateNews(
    id: $id
    attachment: $attachment
    createdAt: $createdAt
    image: $image
    status: $status
  ) {
    id
    attachment
    createdAt
    image
    status
    content
  }
}
`;
export const onDeleteNews = `subscription OnDeleteNews(
  $id: String
  $attachment: String
  $createdAt: String
  $image: String
  $status: String
) {
  onDeleteNews(
    id: $id
    attachment: $attachment
    createdAt: $createdAt
    image: $image
    status: $status
  ) {
    id
    attachment
    createdAt
    image
    status
    content
  }
}
`;
export const onCreateFilling = `subscription OnCreateFilling(
  $name: String
  $label: String
  $image: String
  $attachment: String
) {
  onCreateFilling(
    name: $name
    label: $label
    image: $image
    attachment: $attachment
  ) {
    name
    label
    image
    attachment
  }
}
`;
export const onUpdateFilling = `subscription OnUpdateFilling(
  $name: String
  $label: String
  $image: String
  $attachment: String
) {
  onUpdateFilling(
    name: $name
    label: $label
    image: $image
    attachment: $attachment
  ) {
    name
    label
    image
    attachment
  }
}
`;
export const onDeleteFilling = `subscription OnDeleteFilling(
  $name: String
  $label: String
  $image: String
  $attachment: String
) {
  onDeleteFilling(
    name: $name
    label: $label
    image: $image
    attachment: $attachment
  ) {
    name
    label
    image
    attachment
  }
}
`;
export const onCreateOffer = `subscription OnCreateOffer(
  $id: ID
  $status: String
  $content: String
  $image: String
  $attachment: String
) {
  onCreateOffer(
    id: $id
    status: $status
    content: $content
    image: $image
    attachment: $attachment
  ) {
    id
    status
    content
    image
    attachment
  }
}
`;
export const onUpdateOffer = `subscription OnUpdateOffer(
  $id: ID
  $status: String
  $content: String
  $image: String
  $attachment: String
) {
  onUpdateOffer(
    id: $id
    status: $status
    content: $content
    image: $image
    attachment: $attachment
  ) {
    id
    status
    content
    image
    attachment
  }
}
`;
export const onDeleteOffer = `subscription OnDeleteOffer(
  $id: ID
  $status: String
  $content: String
  $image: String
  $attachment: String
) {
  onDeleteOffer(
    id: $id
    status: $status
    content: $content
    image: $image
    attachment: $attachment
  ) {
    id
    status
    content
    image
    attachment
  }
}
`;
