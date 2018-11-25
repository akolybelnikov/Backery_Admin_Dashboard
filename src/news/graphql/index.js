const GetNews = `query GetNews($id: String!) {
    getNews(id: $id) {
      id
      content
      image
      status
      attachment
      createdAt
    }
  }
  `
const ListNews = `query ListNews($filter: TableNewsFilterInput, $limit: Int, $nextToken: String) {
    listNews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        content
        image
        status
        attachment
        createdAt
      }
      nextToken
    }
  }
  `
const CreateNews = `mutation CreateNews($input: CreateNewsInput!) {
    createNews(input: $input) {
      id
      content
      image
      status
      attachment
      createdAt
    }
  }
  `
const UpdateNews = `mutation UpdateNews($input: UpdateNewsInput!) {
    updateNews(input: $input) {
      id
      content
      image
      status
      attachment
      createdAt
    }
  }
  `
const DeleteNews = `mutation DeleteNews($input: DeleteNewsInput!) {
    deleteNews(input: $input) {
      id
    }
  }
  `

export { GetNews, ListNews, CreateNews, UpdateNews, DeleteNews }
