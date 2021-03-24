import RSS from "rss";
import fs from "fs";
import { getAllPosts } from "@/lib/api";
import config from "../package.json";

export const generateRSS = async (posts) => {
  const feed = new RSS({
    title: 'Vincent Hirtz',
    description: 'config.description',
    feed_url: `https://vincenthirtz.fr/rss.xml`,
    site_url: 'https://vincenthirtz.fr',
    // image_url: `${config.author.url}/favicon.png`,
    // managingEditor: config.email,
    // webMaster: config.email,
    copyright: `${new Date().getFullYear()} Vincent Hirtz`,
    language: "fr",
    // pubDate: config.siteCreationDate,
    ttl: 60,
  });

  let isValid = true;
  // for (const post of posts) {
  // eslint-disable-next-line array-callback-return
  posts.map((post) => {
    const html = post.body;

    if (!post.date) {
      isValid = false;
      console.warn(
        "All posts must have a publishedDate timestamp when generating RSS feed."
      );
      console.warn("Not generating rss.xml.");
    }

    feed.item({
      title: post.title,
      description: html,
      url: `https://vincenthirtz.fr/posts/${post.slug}`,
      author: 'Vincent Hirtz',
      date: new Date(post.date || 0).toISOString(),
    });
  });

  if (!isValid) {
    return;
  }

  // writes RSS.xml to public directory
  const path = `${process.cwd()}/public/rss.xml`;
  fs.writeFileSync(path, feed.xml(), "utf8");
  console.log("generated RSS feed");
};
