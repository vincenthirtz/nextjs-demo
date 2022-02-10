import { useEffect, useState } from "react";
import Head from "next/head";
import { useQuerySubscription } from "react-datocms";
import Container from "@/components/Container";
import Title from "@/components/Title";
import Layout from "@/components/Layout/Layout";
import PostComment from "@/components/Post/PostComment";
import MoreStories from "@/components/More/MoreStories";
import PostBody from "@/components/Post/PostBody";
import PostHeader from "@/components/Post/PostHeader";
import SectionSeparator from "@/components/SectionSeparator";
import { request } from "@/lib/datocms";
import { graphqlRequestSlug } from "@/lib/requests";
import firestore from "../../firebase";

export async function getStaticPaths() {
  const data = await request({ query: `{ allArticles { slug } }` });
  return {
    paths: data.allArticles.map((post) => `/posts/${post.slug}`),
    fallback: false,
  };
}

export async function getStaticProps({ params, preview = false }) {
  const graphqlRequest = graphqlRequestSlug(preview, params);

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
  const [comments, setComments] = useState([]);
  const {
    data: { _site, article, morePosts },
  } = useQuerySubscription(subscription);

  useEffect(() => {
    firestore.collection(`comments`).onSnapshot((snapshot) => {
      const posts = snapshot.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      setComments(posts);
    });
  }, []);

  const { globalSeo } = _site;

  return (
    <Layout preview={preview}>
      <Head>
        <title>
          {article.titre} {globalSeo.titleSuffix}
        </title>
        <meta name="author" content={globalSeo.siteName} />
        <meta
          name="description"
          content={globalSeo.fallbackSeo.description}
        ></meta>
      </Head>
      <Container>
        <Title />
        <article>
          <PostHeader
            titre={article.titre}
            image={article.image}
            date={article.date}
          />
          <PostBody
            name={article.titre}
            content={article.structuredTextContent}
            slug={article.slug}
            author={article.author}
          />
        </article>
        <SectionSeparator />
        <PostComment comments={comments} slug={article.slug} />
        {morePosts.length > 0 && <MoreStories posts={morePosts} />}
      </Container>
    </Layout>
  );
}
