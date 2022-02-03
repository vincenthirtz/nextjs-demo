import { responsiveImageFragment } from "@/lib/fragments";

export const graphqlRequestHome = (preview) => {
  return {
    query: `
      {
        _site {
          globalSeo {
            siteName
            titleSuffix
            twitterAccount
            fallbackSeo {
              title
              twitterCard
              description
            }
          }
          faviconMetaTags {
            tag
            content
            attributes
          }
        }
        allArticles(orderBy: date_DESC) {
          titre
          slug
          date
          resume
          structuredTextContent {
            value
          }
          author {
            name
            description
            avatar  {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                ...responsiveImageFragment
              }
          }
        }
          image {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }
        allPortfolios {
          description
          name
          link
            image {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                ...responsiveImageFragment
              }
            }
          }
      }

      ${responsiveImageFragment}
    `,
    preview,
  };
};

export const graphqlRequestSlug = (preview, params) => {
  return {
    query: `
      query PostBySlug($slug: String) {
        article(filter: {slug: {eq: $slug}}) {
          titre
          slug
          date
          structuredTextContent {
            value
          }
          resume
          author {
            name
            description
            avatar  {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                ...responsiveImageFragment
              }
          }
        }
          image {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }

        morePosts: allArticles(orderBy: date_DESC, first: 2, filter: {slug: {neq: $slug}}) {
          titre
          slug
          date
          structuredTextContent {
            value
          }
          resume
          author {
            name
            description
            avatar  {
              responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
                ...responsiveImageFragment
              }
          }
        }
          image {
            responsiveImage(imgixParams: {fm: jpg, fit: crop, w: 2000, h: 1000 }) {
              ...responsiveImageFragment
            }
          }
        }
        _site {
          globalSeo {
            siteName
            titleSuffix
            twitterAccount
            fallbackSeo {
              title
              twitterCard
              description
            }
          }
          faviconMetaTags {
            tag
            content
            attributes
          }
        }
      }

      ${responsiveImageFragment}
    `,
    preview,
    variables: {
      slug: params.slug,
    },
  };
};
