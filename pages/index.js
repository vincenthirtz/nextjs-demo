import Head from "next/head";
import { useQuerySubscription } from "react-datocms";
import Container from "@/components/Container";
import Intro from "@/components/Intro";
import Layout from "@/components/Layout";
import MoreStories from "@/components/MoreStories";
import { request } from "@/lib/datocms";
import { responsiveImageFragment } from "@/lib/fragments";
import Playing from "@/components/Playing";

export async function getStaticProps({ preview }) {
  const graphqlRequest = {
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
      }

      ${responsiveImageFragment}
    `,
    preview,
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

export default function Index({ subscription }) {
  const {
    data: { allArticles, _site },
  } = useQuerySubscription(subscription);

  const posts = allArticles;
  const { globalSeo } = _site;

  return (
    <>
      <Layout preview={subscription.preview}>
        <Head>
          <title>{globalSeo.siteName}</title>
          <meta name="author" content={globalSeo.siteName} />
          <meta
            name="description"
            content={globalSeo.fallbackSeo.description}
          ></meta>
        </Head>
        <Container>
          <Intro />
          <Playing />
          {posts.length > 0 && <MoreStories posts={posts} />}
        </Container>
      </Layout>
    </>
  );
}
