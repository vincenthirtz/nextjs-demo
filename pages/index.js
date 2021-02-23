import Head from "next/head";
import { renderMetaTags, useQuerySubscription } from "react-datocms";
import Container from "../components/container";
import HeroPost from "../components/hero-post";
import Intro from "../components/intro";
import Layout from "../components/layout";
import MoreStories from "../components/more-stories";
import { request } from "../lib/datocms";
import { responsiveImageFragment } from "../lib/fragments";

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
          body
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

  const heroPost = allArticles[0];
  const morePosts = allArticles.slice(1);
  const { globalSeo } = _site;

  return (
    <>
      <Layout preview={subscription.preview}>
        <Head>
          <title>{globalSeo.siteName}</title>
          <meta name="author" content={globalSeo.siteName} />
          <meta name="description" content={globalSeo.fallbackSeo.description}></meta>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              titre={heroPost.titre}
              image={heroPost.image}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.resume}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}
