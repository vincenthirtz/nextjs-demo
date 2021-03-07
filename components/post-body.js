import Avatar from "./avatar";
import Share from "./share";
import { StructuredText } from "react-datocms";

export default function PostBody({ name, content, slug, author }) {
  return (
    <div className="max-w-2xl mx-auto">
      <StructuredText data={content} 
      renderInlineRecord={({ record }) => {
        switch (record.__typename) {
          case "BlogPostRecord":
            return <a href={`/blog/${record.slug}`}>{record.title}</a>;
          default:
            return null;
        }
      }}
      renderLinkToRecord={({ record, children }) => {
        switch (record.__typename) {
          case "BlogPostRecord":
            return <a href={`/blog/${record.slug}`}>{children}</a>;
          default:
            return null;
        }
      }}
      renderBlock={({ record }) => {
        switch (record.__typename) {
          case "ImageBlockRecord":
            return <img src={record.image.url} alt={record.image.alt} />;
          default:
            return null;
        }
      }}
      />
      <Share slug={slug} name={name} />
      <div className="hidden md:block md:mb-12">
        <Avatar alt={author.name} src={author.avatar} />
        <div
          style={{ margin: "10px" }}
          dangerouslySetInnerHTML={{ __html: author.description }}
        />
      </div>
      <div className="block md:hidden mb-6">
        <Avatar alt={author.name} src={author.avatar} />
        <div
          style={{ margin: "10px" }}
          dangerouslySetInnerHTML={{ __html: author.description }}
        />
      </div>
    </div>
  );
}
