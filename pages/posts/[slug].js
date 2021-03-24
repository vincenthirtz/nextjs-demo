import { useEffect, useState } from 'react';
import Head from "next/head";
import { useQuerySubscription } from "react-datocms";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Layout from "../../components/Layout";
import PostComment from "../../components/Post/PostComment";
import MoreStories from "../../components/MoreStories";
import PostBody from "../../components/Post/PostBody";
import PostHeader from "../../components/Post/PostHeader";
import SectionSeparator from "../../components/SectionSeparator";
import { request } from "../../lib/datocms";
import { responsiveImageFragment } from "../../lib/fragments";
import firestore from "../../firebase"

export async function getStaticPaths() {
  const data = await request({ query: `{ allArticles { slug } }` });
  return {
    paths: data.allArticles.map((post) => `/posts/${post.slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = {
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

  return {
    props: {
      subscription: preview
        ? {
          ...graphqlRequest,
          initialData: await request(graphqlRequest),
          token: process.env.NEXT_EXAMPLE_CMS_DATOCMS_API_TOKEN,
        }
        : {
          enabled: false,
          initialData: await request(graphqlRequest),
        },
    },
  };
}

export default function Post({ subscription, preview }) {
  const [comments, setComments] = useState([]);
  const {
    data: { _site, article, morePosts },
  } = useQuerySubscription(subscription);

  useEffect(() => {
    firestore
      .collection(`comments`)
      .onSnapshot(snapshot => {
        const posts = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }
          })
        setComments(posts)
      })
  }, [])

  const { globalSeo } = _site;

  return (
    <Layout preview={preview}>
      <Head>
        <title>{article.titre} {globalSeo.titleSuffix}</title>
        <meta name="author" content={globalSeo.siteName} />
        <meta name="description" content={globalSeo.fallbackSeo.description}></meta>
      </Head>
      <Container>
        <Header />
        <article>
          <PostHeader
            titre={article.titre}
            image={article.image}
            date={article.date}
          />
          <PostBody
            name={article.titre}
            content={article.structuredTextContent}
            slug={article.slug}
            author={article.author}
          />
        </article>
        <SectionSeparator />
       <PostComment comments={comments} slug={article.slug} />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}
