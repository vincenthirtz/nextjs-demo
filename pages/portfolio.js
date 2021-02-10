import Head from "next/head";
import { useQuerySubscription } from "react-datocms";
import Intro from "../components/intro";
import Container from "../components/container";
import Layout from "../components/layout";
import { makeStyles } from "@material-ui/core/styles";
import PortfolioPreview from "../components/portfolio-preview";
import { responsiveImageFragment } from "../lib/fragments";
import { request } from "../lib/datocms";

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
    data: { allPortfolios },
  } = useQuerySubscription(subscription);

  const portfolio = allPortfolios;

  return (
    <>
      <Layout>
        <Container>
          <Intro />
          <div className={classes.root}>
            <section>
              <h2 className="mb-8 text-6xl md:text-5xl font-bold tracking-tighter leading-tight">
                Créations web
              </h2>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
                {portfolio.map((port) => (
                  <PortfolioPreview
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
