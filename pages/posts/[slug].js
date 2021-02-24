import { useEffect, useState } from 'react';
import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import Comment from "../../components/comment";
import MoreStories from "../../components/more-stories";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
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
          body
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
          body
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

  console.log("comments ", comments)

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
            content={article.body}
            slug={article.slug}
            author={article.author}
          />
        </article>
        <SectionSeparator />
        {comments.length > 0 && <Comment comments={comments} slug={article.slug} />}
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}
