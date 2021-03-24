import CoverImage from "../CoverImage/CoverImage";

export default function PortfolioItem({ name, image, description }) {
  return (
    <div>
      <div className="mb-5">
        <CoverImage title={name} responsiveImage={image.responsiveImage} />
      </div>
      <h3 className="text-3xl mb-3 leading-snug">{name}</h3>
      <div
        className="text-lg leading-relaxed mb-4"
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </div>
  );
}
