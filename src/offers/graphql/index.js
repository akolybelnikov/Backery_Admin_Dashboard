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
const ListOffers = `query ListOffers(
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
        attachment
      }
      nextToken
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
export { GetOffer, ListOffers, CreateOffer, UpdateOffer, DeleteOffer }
