import Head from "next/head";
import Intro from "../components/Intro";
import Container from "../components/Container";
import Layout from "../components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import { request } from "../lib/datocms";
import { useQuerySubscription } from "react-datocms";

const useStyles = makeStyles(() => ({
    root: {
        flexGrow: 1,
    },
}));


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
        }
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

export default function Live({ subscription }) {
    const classes = useStyles();
    const {
        data: { _site },
      } = useQuerySubscription(subscription);
    const { globalSeo } = _site;

    return (
        <>
            <Layout>
                <Head>
                    <title>Live {globalSeo.titleSuffix}</title>
                    <meta name="author" content={globalSeo.siteName} />
                    <meta name="description" content={globalSeo.fallbackSeo.description}></meta>
                </Head>
                <Container>
                    <Intro />
                    <div className={classes.root}>
                        <iframe
                            src={`https://player.twitch.tv/?channel=${process.env.NEXT_EXAMPLE_CHANNEL_TWITCH}&parent=${process.env.NEXT_EXAMPLE_SITE_URL}`}
                            frameBorder="0"
                            allowFullScreen="true"
                            scrolling="no"
                            height="378"
                            width="620" />
                    </div>
                </Container>
            </Layout>
        </>
    );
}
