import Head from "next/head";
import { useQuerySubscription } from "react-datocms";
import Container from "@/components/Container";
import Title from "@/components/Title";
import Layout from "@/components/Layout/Layout";
import MoreCryptos from "@/components/More/MoreCryptos";
import MoreStories from "@/components/More/MoreStories";
import MoreVideos from "@/components/More/MoreVideos";
import { request } from "@/lib/datocms";
import { graphqlRequestHome } from "@/lib/requests";

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
          <Title title="Blog" />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight">
            <ion-icon name="pencil-outline"></ion-icon> Articles ({posts.length}
            )
          </h1>
          {posts.length > 0 && <MoreStories posts={posts} />}
          <h1 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight">
            <ion-icon name="rocket-outline"></ion-icon> Projets (
            {portfolio.length})
          </h1>
          {portfolio.length > 0 && <MoreStories posts={portfolio} />}
          <h1 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight">
            <ion-icon name="game-controller-outline"></ion-icon> Vidéos (
            {games.length})
          </h1>
          {games.length > 0 && <MoreVideos posts={games} />}

          <h1 className="text-xl md:text-2xl font-bold tracking-tight md:tracking-tighter leading-tight">
            <ion-icon name="analytics-outline"></ion-icon> Cryptos
          </h1>
          <MoreCryptos />
        </Container>
      </Layout>
    </>
  );
}
