import Image from 'next/image';

export default function LinkImage({
  className,
  imageName,
  hover,
}: {
  className: string;
  imageName: string;
  hover: boolean;
}) {
  return (
    <Image
      className={className}
      src={`/images/${imageName}${hover ? '-hover' : ''}.png`}
      width={16}
      height={16}
      alt="link-image"
    />
  );
}
