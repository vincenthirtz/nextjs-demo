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
        allArticles(orderBy: date_DESC) {
          titre
          slug
          date
          body
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
    data: { allArticles },
  } = useQuerySubscription(subscription);

  const heroPost = allArticles[0];
  const morePosts = allArticles.slice(1);
  // const metaTags = blog.seo.concat(site.favicon);

  return (
    <>
      <Layout preview={subscription.preview}>
        {/* <Head>{renderMetaTags(metaTags)}</Head> */}
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.titre}
              coverImage={heroPost.image}
              date={heroPost.date}
              author={heroPost.authorname}
              slug={heroPost.slug}
              excerpt={heroPost.body}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  );
}
