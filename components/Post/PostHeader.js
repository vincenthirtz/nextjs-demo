import Date from "../DateFR";
import CoverImage from "../CoverImage/CoverImage";
import PostTitle from "./PostTitle";

export default function PostHeader({ titre, image, date }) {
  return (
    <>
      <PostTitle>{titre}</PostTitle>
      <div className="mb-8 md:mb-16 -mx-5 sm:mx-0">
        <CoverImage title={titre} responsiveImage={image.responsiveImage} />
      </div>
      <div className="max-w-2xl mx-auto">
        <div className="mb-6 text-lg">
          <Date dateString={date} />
        </div>
      </div>
    </>
  );
}
