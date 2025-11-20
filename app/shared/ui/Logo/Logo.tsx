import Link from "next/link";
import { LogoIconWithText, LogoWithoutText } from "../../icons/icons";

interface LogoProps {
  withText?: boolean;
  SVGProps?: React.SVGProps<SVGSVGElement>;
}

const Logo = ({ withText, SVGProps }: LogoProps) => {
  return (
    <Link
      href="/"
      className="inline-block transition duration-300 hover:opacity-90 hover:drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.25)] hover:drop-shadow-primary"
    >
      {withText ? (
        <LogoIconWithText {...SVGProps} />
      ) : (
        <LogoWithoutText {...SVGProps} />
      )}
    </Link>
  );
};

export default Logo;
