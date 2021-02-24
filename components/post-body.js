import Avatar from "./avatar";
import markdownStyles from "./markdown-styles.module.css";
import Share from "./share";

export default function PostBody({ name, content, slug, author }) {
  return (
    <div className="max-w-2xl mx-auto">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
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
