import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  withText?: boolean;
  width?: number;
}

const Logo = ({ withText, width }: LogoProps) => {
  const logoPath = withText ? "/logo-with-text.svg" : "/logo-without-text.svg";

  const aspectRatio = 45 / 196;

  const defaultWidth = withText ? 196 : 45;

  const actualWidth = width ?? defaultWidth;
  const actualHeight = Math.round(actualWidth * aspectRatio);

  return (
    <Link
      href="/"
      className="flex items-center gap-2 transition hover:opacity-90 hover:drop-shadow-md hover:drop-shadow-primary"
    >
      <Image
        loading="eager"
        width={actualWidth}
        height={actualHeight}
        src={logoPath}
        alt="Логотип DraimCiDo"
      />
    </Link>
  );
};

export default Logo;
