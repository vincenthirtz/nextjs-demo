import Avatar from "./avatar";
import Share from "./share";
import { StructuredText } from "react-datocms";

export default function PostBody({ name, content, slug, author }) {
  return (
    <div className="max-w-2xl mx-auto">
      <StructuredText data={content} />
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
