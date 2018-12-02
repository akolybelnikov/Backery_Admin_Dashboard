const GetOffer = `query GetOffer($id: ID!) {
    getOffer(id: $id) {
      id
      content
      image
      status
      attachment
    }
  }
  `
const CreateOffer = `mutation CreateOffer($input: CreateOfferInput!) {
    createOffer(input: $input) {
        content
        image
        status
        attachment
    }
  }
  `
const UpdateOffer = `mutation UpdateOffer($input: UpdateOfferInput!) {
    updateOffer(input: $input) {
        id
        content
        image
        status
        attachment
    }
  }
  `
const DeleteOffer = `mutation DeleteOffer($input: DeleteOfferInput!) {
    deleteOffer(input: $input) {
      id
    }
  }
  `
export { GetOffer, CreateOffer, UpdateOffer, DeleteOffer }
