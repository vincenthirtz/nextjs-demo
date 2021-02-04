import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "../../components/container";
import Header from "../../components/header";
import Layout from "../../components/layout";
import MoreStories from "../../components/more-stories";
import PostBody from "../../components/post-body";
import PostHeader from "../../components/post-header";
import SectionSeparator from "../../components/section-separator";
import { request } from "../../lib/datocms";
import {  responsiveImageFragment } from "../../lib/fragments";

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
          authorname
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
          authorname
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
  const {
    data: {article, morePosts },
  } = useQuerySubscription(subscription);

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        <article>
          <PostHeader
            title={article.titre}
            image={article.image}
            date={article.date}
            authorname={article.authorname}
          />
          <PostBody content={article.body} />
        </article>
        <SectionSeparator />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}
