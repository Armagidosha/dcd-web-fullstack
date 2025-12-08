import Link from "next/link";
import {
  type IconProps,
  LogoIconWithText,
  LogoWithoutText,
} from "../../icons/icons";

interface LogoProps extends IconProps {
  withText?: boolean;
}

const Logo = ({ withText, ...props }: LogoProps) => {
  return (
    <Link
      href="/"
      className="inline-block transition duration-300 hover:opacity-90 hover:drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.25)] hover:drop-shadow-primary"
    >
      {withText ? (
        <LogoIconWithText {...props} />
      ) : (
        <LogoWithoutText {...props} />
      )}
    </Link>
  );
};

export default Logo;
