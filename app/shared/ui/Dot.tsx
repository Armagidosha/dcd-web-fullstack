import clsx from "clsx";

interface DotProps {
  posX?: `left-${number}` | `right-${number}`;
  posY?: `top-${number}` | `bottom-${number}`;
  width?: `w-${number}`;
  height?: `h-${number}`;
  bg?: `bg-${string}`;
}

export default function Dot({
  posX = "left-0",
  posY = "top-0",
  width = "w-2",
  height = "h-2",
  bg = "bg-primary",
}: DotProps) {
  return (
    <div
      className={clsx(
        "absolute rounded-full animate-pulse",
        posX,
        posY,
        width,
        height,
        bg,
      )}
    />
  );
}
