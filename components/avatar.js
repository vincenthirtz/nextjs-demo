export default function Avatar({ alt, src }) {
  const { responsiveImage } = src;
  const { srcSet } = responsiveImage;
  return (
    <div className="flex items-center">
      <img src={srcSet} className="w-12 h-12 rounded-full mr-4" alt={alt} />
      <div className="text-xl font-bold">{alt}</div>
    </div>
  );
}
