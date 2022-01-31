import Head from "next/head";
import { useQuerySubscription } from "react-datocms";
import Container from "@/components/Container";
import HeroPost from "@/components/Post/PostHero";
import Intro from "@/components/Intro";
import Layout from "@/components/Layout";
import MoreStories from "@/components/MoreStories";
import { request } from "@/lib/datocms";
import { responsiveImageFragment } from "@/lib/fragments";
import { getNowPlaying } from "@/lib/now-playing";
import Playing from "@/components/Playing";

export async function getData() {
  const response = await getNowPlaying();

  console.log("response ", response)

  if (response.status === 204 || response.status > 400) {
    return {
      status: 200,
      body: { isPlaying: false },
    };
  }

  const song = await response.json();

  if (song.item === null) {
    return {
      status: 200,
      body: { isPlaying: false },
    };
  }

  const isPlaying = song.is_playing;
  const title = song.item.name;
  const artist = song.item.artists.map((_artist) => _artist.name).join(", ");
  const album = song.item.album.name;
  const albumImageUrl = song.item.album.images[0].url;
  const songUrl = song.item.external_urls.spotify;

  console.log("isPlaying ", isPlaying);
  console.log("title ", title);
  console.log("artist ", artist);
  console.log("album ", album);
  console.log("albumImageUrl ", albumImageUrl);
  console.log("songUrl ", songUrl);

  return song;
}

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

  let song;

  getData().then(data => {
    console.log("data ", data)
    song = data;
  })

  const heroPost = allArticles[0];
  const morePosts = allArticles.slice(1);
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
          <Playing song={song} />
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
