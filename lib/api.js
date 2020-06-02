import 'isomorphic-unfetch'
import Prismic from 'prismic-javascript'

//const REPOSITORY = process.env.NEXT_EXAMPLE_CMS_PRISMIC_REPOSITORY_NAME
const REF_API_URL = `https://next-demo-1.prismic.io/api/v2`
const GRAPHQL_API_URL = `https://next-demo-1.prismic.io/graphql`
// export const API_URL = 'https://your-repo-name.cdn.prismic.io/api/v2'
//export const API_TOKEN = process.env.NEXT_EXAMPLE_CMS_PRISMIC_API_TOKEN
export const API_TOKEN = `MC5YclFBVXhFQUFDVUFyNjZK.SO-_ve-_ve-_ve-_vVrvv73vv73vv71eau-_ve-_ve-_vSpH77-9YXtUdO-_ve-_vQJo77-977-977-977-977-977-9AA`
//export const API_LOCALE = process.env.NEXT_EXAMPLE_CMS_PRISMIC_REPOSITORY_LOCALE
const API_LOCALE = "en-us"
export const PrismicClient = Prismic.client(REF_API_URL, {
  accessToken: API_TOKEN,
})

async function fetchAPI(query, { previewData, variables } = {}) {

  const prismicAPI = await PrismicClient.getApi()
  const res = await fetch(
    `${GRAPHQL_API_URL}?query=${query}&variables=${JSON.stringify(variables)}`,
    {
      headers: {
        'Prismic-Ref': previewData?.ref || prismicAPI.masterRef.ref,
        'Content-Type': 'application/json',
        'Accept-Language': API_LOCALE,
        Authorization: `Token ${API_TOKEN}`,
      },
    }
  )
  if (res.status !== 200) {
    console.log(await res.text())
    throw new Error('Failed to fetch API')
  }

  const json = await res.json()
  if (json.errors) {
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }
  return json.data
}

export async function getAllKeyIssueTypes(){
   const data = await fetchAPI(
     `
     {
      allKeyIssuesCategoriess {
        edges{
          node{
            category
            _meta{
              id,
              uid,
            }
          }
        }
      }
    }
     `
   )
   return data?.allKeyIssuesCategoriess?.edges
}



export async function getKeyIssuesCategoryById(previewData, id){

  const data = await fetchAPI(

    `query categoryBySlug($id: String!) {
      allKeyIssuesCategoriess(id : $id){
        edges{
          node{
            category,
            _meta{
              id
            }
          }
        }
      }
    }`
    ,
    {
      previewData,
      variables: {
        id,
        lang: API_LOCALE,
      },
    }
  )
  return data?.allKeyIssuesCategoriess?.edges[0].node
}

export async function getKeyIssuesCategoryBySlug(previewData, uid){

  const data = await fetchAPI(

    `query categoryBySlug($uid: String!) {
      allKeyIssuesCategoriess(uid : $uid){
        edges{
          node{
            category,
            _meta{
              id
            }
          }
        }
      }
    }`
    ,
    {
      previewData,
      variables: {
        uid,
        lang: API_LOCALE,
      },
    }
  )
  return data?.allKeyIssuesCategoriess?.edges[0].node
}

export async function getKeyIssuesByType(previewData, id){
  const data = await fetchAPI(
    `query PostsByType($id: String!) {
      allKeyIssuess(where : { keyIssueCategory : $id }) {
        edges{
          node{
            title
            content
            coverimage
            keyIssueCategory{
              ... on KeyIssuesCategories{
                category
                _meta{
                  uid
                }
              }
            }
            _meta{
              uid
            }
          }
        }
      }
    }`
    ,
    {
      previewData,
      variables: {
        id,
        lang: API_LOCALE,
      },
    }
  )
  return data?.allKeyIssuess?.edges
}

export async function getKeyIssuesBySlug(previewData, uid){
  const data = await fetchAPI(
    `query PostsByType($uid: String!) {
      allKeyIssuess(uid : $uid) {
        edges{
          node{
            title
            content
            coverimage
            keyIssueCategory{
              ... on KeyIssuesCategories{
                category
                _meta{
                  uid
                }
              }
            }
            _meta{
              uid
            }
          }
        }
      }
    }`
    ,
    {
      previewData,
      variables: {
        uid,
        lang: API_LOCALE,
      },
    }
  )
  return data?.allKeyIssuess?.edges
}

export async function getAllKeyIssues(){
  const data = await fetchAPI(
    `
    {
      allKeyIssuess {
        edges{
          node{
            keyIssueCategory{
               ... on KeyIssuesCategories{
                _meta{
                  uid
                  id
                }
                category
              }
            }
            title
            _meta{
              uid,
            }
          }
        }
      }
    }
    `
  )
  return data?.allKeyIssuess?.edges
}

export async function getPaginatedInFocus(after, first){
    const data = await fetchAPI(
      `query allInFocuss($first : Int, $after: String!) {
        allInFocuss(first : $first, after : $after){
          edges{
            node{
              title
              banner
              _meta{
                uid
                id
              }
            }
            cursor
          }
          totalCount
        }
      }`
      ,
      {
        variables: {
          after,
          first,
          lang: API_LOCALE,
        },
      }
    )
    return data?.allInFocuss
    // return {
    //   allInFocuss : data.allInFocuss.edges,
    //   total : data.allInFocuss.totalCount
    // }
}

export async function getAllInfocus(){
  const data = await fetchAPI(
    `
    {
      allInFocuss {
        edges{
          node{
            title
            _meta{
              uid
              id
            }
          }
          cursor
        }
      }
    }
    `
  )
  return data?.allInFocuss?.edges
}

export async function getAllPostsWithSlug() {
  const data = await fetchAPI(`
    {
      allPosts {
        edges {
          node {
            _meta {
              uid
            }
          }
        }
      }
    }
  `)
  return data?.allPosts?.edges
}

export async function getAllPostsForHome(previewData) {
  const data = await fetchAPI(
    `
    query {
      allPosts(sortBy: date_DESC) {
        edges {
          node {
            date
            title
            content
            coverimage
            excerpt
            author {
              ...on Author {
                name
                picture
              }
            }
            _meta {
              uid
            }
          }
        }
      }
    }
  `,
    { previewData }
  )

  return data.allPosts.edges
}

export async function getPostAndMorePosts(slug, previewData) {
  const data = await fetchAPI(
    `
  query PostBySlug($slug: String!, $lang: String!) {
    post(uid: $slug, lang: $lang) {
      title
      content
      date
      coverimage
      author {
        ...on Author {
          name
          picture
        }
      }
      _meta {
        uid
      }
    }

   morePosts: allPosts(sortBy: date_DESC, first: 3) {
      edges {
        node {
          title
          content
          date
          coverimage
          excerpt
          author {
            ...on Author {
              name
              picture
            }
          }
          _meta {
            uid
          }
        }
      }
    }
  }
  `,
    {
      previewData,
      variables: {
        slug,
        lang: API_LOCALE,
      },
    }
  )

  data.morePosts = data.morePosts.edges
    .filter(({ node }) => node._meta.uid !== slug)
    .slice(0, 2)

  return data
}
