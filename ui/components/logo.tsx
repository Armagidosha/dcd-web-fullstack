import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="inline-block transition duration-300 hover:opacity-90 hover:drop-shadow-[0_2.5px_2.5px_rgba(0,0,0,0.25)] hover:drop-shadow-primary"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="196" height="45">
        <title>На главную</title>
        <image href="/images/logo.png" width={45} height={45} />
        <text
          x="50"
          y="30"
          fill="currentColor"
          fontFamily="Montserrat"
          fontWeight="500"
          fontSize="20"
        >
          DraimCiDo
        </text>
      </svg>
    </Link>
  );
}
