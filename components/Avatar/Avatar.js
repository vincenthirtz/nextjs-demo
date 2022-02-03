import Image from "next/image";

export default function Avatar({ alt, src }) {
  let image;
  if (src) {
    const { responsiveImage } = src;
    const { srcSet } = responsiveImage;
    image = srcSet;
  } else {
    image =
      "https://www.datocms-assets.com/42175/1612544114-081rh7ka400x400.jpg?fit=crop&fm=jpg&h=1000&w=2000%202000w";
  }

  return (
    <div className="flex items-center">
      <img src={image} className="w-12 h-12 rounded-full mr-4" alt={alt} />
      <div className="text-xl font-bold">{alt}</div>
    </div>
  );
}
