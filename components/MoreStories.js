import PostPreview from "@/components/Post/PostPreview";

export default function MoreStories({ posts }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-5xl font-bold tracking-tighter leading-tight">
        Autres articles
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:col-gap-16 lg:col-gap-32 row-gap-20 md:row-gap-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            titre={post.titre}
            image={post.image}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.resume}
          />
        ))}
      </div>
    </section>
  );
}
