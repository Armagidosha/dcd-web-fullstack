import Image from "next/image";
import Link from "next/link";
import st from "./Logo.module.scss";

interface ILogoProps {
  withText?: boolean;
  width?: number;
}

const Logo = ({ withText, width }: ILogoProps) => {
  const logoPath = withText ? "/logo-with-text.svg" : "/logo-without-text.svg";

  const aspectRatio = 45 / 196;

  const defaultWidth = withText ? 196 : 45;

  const actualWidth = width ?? defaultWidth;
  const actualHeight = Math.round(actualWidth * aspectRatio);

  return (
    <Link href="/" className={st.logo}>
      <Image
        width={actualWidth}
        height={actualHeight}
        src={logoPath}
        alt="Логотип DraimCiDo"
      />
    </Link>
  );
};

export default Logo;
