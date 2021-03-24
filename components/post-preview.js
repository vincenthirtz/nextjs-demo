import Avatar from "../components/avatar";
import Date from "../components/date";
import CoverImage from "./cover-image";
import Link from "next/link";
import PageViews from "./PageViews";

export default function PostPreview({
  titre,
  image,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage
          slug={slug}
          title={titre}
          responsiveImage={image.responsiveImage}
        />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a className="hover:underline">{titre}</a>
        </Link>
      </h3>
      <div className="text-lg mb-4">
        <Date dateString={date} /> | <PageViews slug={slug} />
      </div>
      <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
      <Avatar alt={author.name} src={author.avatar} />
    </div>
  );
}
