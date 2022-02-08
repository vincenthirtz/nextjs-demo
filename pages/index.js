import Head from "next/head";
import { useQuerySubscription } from "react-datocms";
import Container from "@/components/Container";
import Intro from "@/components/Intro";
import Layout from "@/components/Layout/Layout";
import MoreStories from "@/components/More/MoreStories";
import MoreVideos from "@/components/More/MoreVideos";
import { request } from "@/lib/datocms";
import { graphqlRequestHome } from "@/lib/requests";
import Playing from "@/components/Playing";

export async function getStaticProps({ preview }) {
  const graphqlRequest = graphqlRequestHome(preview);

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
    data: { allArticles, allPortfolios, allGames, _site },
  } = useQuerySubscription(subscription);

  const portfolio = allPortfolios;
  const games = allGames;
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
          <h1 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight">
            <ion-icon name="pencil-outline"></ion-icon> Articles
          </h1>
          {posts.length > 0 && <MoreStories posts={posts} />}
          <h1 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight">
            <ion-icon name="rocket-outline"></ion-icon> Projets
          </h1>
          {portfolio.length > 0 && <MoreStories posts={portfolio} />}
          <h1 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight">
            <ion-icon name="game-controller-outline"></ion-icon> Vidéos
          </h1>
          {games.length > 0 && <MoreVideos posts={games} />}
        </Container>
      </Layout>
    </>
  );
}
