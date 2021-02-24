import Image from 'next/image'

export default function Avatar({ alt, src }) {
  let image;
  if (src) {
    const { responsiveImage } = src;
    const { srcSet } = responsiveImage;
    image = srcSet;
  }
  return (
    <div className="flex items-center">
      {!src && <Image src="/avatarnone.jpg" alt={alt} width="64" height="64" />}
      {src && <img src={image} className="w-12 h-12 rounded-full mr-4" alt={alt} />}
      <div className="text-xl font-bold">{alt}</div>
    </div>
  );
}
