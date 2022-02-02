import Avatar from "@/components/Avatar/Avatar";
import Date from "@/components/DateFR";
import CoverImage from "@/components/CoverImage/CoverImage";
import Link from "next/link";
import PageViews from "@/components/PageViews/PageViews";

export default function MoreStories({ posts }) {
  return (
    <section>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {posts.map((post) => (
            <div className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3">
              <article
                key={post.slug}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                <CoverImage
                  className="block h-auto w-full"
                  slug={post.slug}
                  title={post.titre}
                  responsiveImage={post.image.responsiveImage}
                />

                <header
                  className="flex items-center justify-between leading-tight p-2 md:p-4"
                  style={{ minHeight: "100px" }}
                >
                  <h1 className="text-lg">
                    <Link as={`/posts/${post.slug}`} href="/posts/[slug]">
                      <a className="hover:underline">{post.titre}</a>
                    </Link>
                  </h1>
                </header>

                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                  <a
                    className="flex items-center no-underline hover:underline"
                    target={"_blank"}
                    href="https://www.linkedin.com/in/hirtzvincent/"
                  >
                    <p className="ml-2 text-sm">
                      <Avatar
                        className="block rounded-full"
                        alt={<Date dateString={post.date} />}
                        src={post.author.avatar}
                      />
                    </p>
                  </a>
                  <span className="no-underline text-grey-darker hover:text-red-dark">
                    <PageViews slug={post.slug} />
                  </span>
                </footer>
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
