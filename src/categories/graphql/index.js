const GetCategory = `query GetCategory($name: String!) {
    getCategory(name: $name) {
        name
        image
        status
        title
        attachment
    }
  }
  `
const CreateCategory = `mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
        name
        image
        status
        title
        attachment
    }
  }
  `
const UpdateCategory = `mutation UpdateCategory($input: UpdateCategoryInput!) {
    updateCategory(input: $input) {
        name
        image
        status
        title
        attachment
    }
  }
  `
const DeleteCategory = `mutation DeleteCategory($input: DeleteCategoryInput!) {
    deleteCategory(input: $input) {
      name
    }
  }
  `
export { GetCategory, CreateCategory, UpdateCategory, DeleteCategory }
