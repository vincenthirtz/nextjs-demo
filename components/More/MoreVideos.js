import PageViews from "@/components/PageViews/PageViews";
import Youtube from "@/components/Youtube/Youtube";

export default function MoreStories({ posts }) {
  function createMarkup(desc) {
    return { __html: desc };
  }

  return (
    <section>
      <div className="container my-12 mx-auto px-4 md:px-12">
        <div className="flex flex-wrap -mx-1 lg:-mx-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
            >
              <article className="overflow-hidden rounded-lg shadow-lg">
                <Youtube embedId={post.contenturl.providerUid} />

                <header
                  className="flex items-center justify-between leading-tight p-2 md:p-4"
                  style={{ minHeight: "100px" }}
                >
                  <h1 className="text-lg">
                    <span
                      dangerouslySetInnerHTML={createMarkup(post.title)}
                    ></span>
                  </h1>
                </header>

                <footer className="flex items-center justify-between leading-none p-2 md:p-4">
                  <a
                    className="flex items-center no-underline hover:underline"
                    target={"_blank"}
                    href={"#"}
                  >
                    <div className="ml-2 text-sm"></div>
                  </a>
                  <span className="no-underline text-grey-darker hover:text-red-dark">
                    {post?.author?.avatar && <PageViews slug={post.slug} />}
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
