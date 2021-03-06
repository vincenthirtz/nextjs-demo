import Avatar from "../Avatar/Avatar";
import Date from "../DateFR";
import CoverImage from "../CoverImage/CoverImage";
import Link from "next/link";
import PageViews from "../PageViews/PageViews";

export default function PostHero({
  titre,
  image,
  date,
  excerpt,
  author,
  slug,
}) {
  return (
    <section>
      <div className="mb-8 md:mb-16">
        <CoverImage
          title={titre}
          responsiveImage={image.responsiveImage}
          slug={slug}
        />
      </div>
      <div className="md:grid md:grid-cols-2 md:col-gap-16 lg:col-gap-8 mb-20 md:mb-28">
        <div>
          <h3 className="mb-4 text-4xl lg:text-6xl leading-tight">
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a className="hover:underline">{titre}</a>
            </Link>
          </h3>
          <div className="mb-4 md:mb-0 text-lg">
          <Date dateString={date} /> | <PageViews slug={slug} />
          </div>
        </div>
        <div>
          <p className="text-lg leading-relaxed mb-4">{excerpt}</p>
          <Avatar alt={author.name} src={author.avatar} />
        </div>
      </div>
    </section>
  );
}
