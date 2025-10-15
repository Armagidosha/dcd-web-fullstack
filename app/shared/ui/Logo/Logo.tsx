import Image from "next/image";
import Link from "next/link";
import st from "./Logo.module.scss";

interface ILogoProps {
  withText?: boolean;
}

const Logo = ({ withText }: ILogoProps) => {
  const logoPath = withText ? "/logo-with-text.svg" : "/logo-without-text.svg";
  return (
    <Link href="/" className={st.logo}>
      <Image
        width={withText ? 196 : 45}
        height={45}
        src={logoPath}
        alt="Логотип DraimCiDo"
      />
    </Link>
  );
};

export default Logo;
