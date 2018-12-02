const GetFilling = `query GetFilling($name: String!) {
    getFilling(name: $name) {
      name
      label
      image
      attachment
    }
  }
  `
const CreateFilling = `mutation CreateFilling($input: CreateFillingInput!) {
    createFilling(input: $input) {
        name
        label
        image
        attachment
    }
  }
  `
const UpdateFilling = `mutation UpdateFilling($input: UpdateFillingInput!) {
    updateFilling(input: $input) {
      name
      image
      attachment
      label
    }
  }
  `
const DeleteFilling = `mutation DeleteFilling($input: DeleteFillingInput!) {
    deleteFilling(input: $input) {
      name
    }
  }
  `

export { GetFilling, CreateFilling, UpdateFilling, DeleteFilling }
