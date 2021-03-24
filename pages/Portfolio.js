import Head from "next/head";
import { useQuerySubscription } from "react-datocms";
import Intro from "@/components/Intro";
import Container from "@/components/Container";
import Layout from "@/components/Layout";
import { makeStyles } from "@material-ui/core/styles";
import PortfolioItem from "@/components/PortfolioItem/PortfolioItem";
import { responsiveImageFragment } from "@/components/fragments";
import { request } from "@/components/datocms";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(4),
    margin: "auto",
    maxWidth: 500,
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
        allPortfolios {
        description
        name
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

export default function Portfolio({ subscription }) {
  const classes = useStyles();
  const {
    data: { _site, allPortfolios },
  } = useQuerySubscription(subscription);

  const portfolio = allPortfolios;
  const { globalSeo } = _site;

  return (
    <>
      <Layout>
        <Head>
          <title>Portfolio {globalSeo.titleSuffix}</title>
          <meta name="author" content={globalSeo.siteName} />
          <meta name="description" content={globalSeo.fallbackSeo.description}></meta>
        </Head>
        <Container>
          <Intro />
          <div className={classes.root}>
            <section>
              <h2 className="mb-8 text-6xl md:text-5xl font-bold tracking-tighter leading-tight">
                Créations web
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
                {portfolio.map((port) => (
                  <PortfolioItem
                    key={port.name}
                    titre={port.name}
                    image={port.image}
                    description={port.description}
                  />
                ))}
              </div>
            </section>
          </div>
        </Container>
      </Layout>
    </>
  );
}
