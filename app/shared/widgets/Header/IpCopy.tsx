import clsx from "clsx";

interface IpCopyProps {
  className?: string;
}

const IpCopy = ({ className }: IpCopyProps) => {
  return (
    <div
      className={clsx(
        "bg-primary px-10 py-2.5 text-center rounded-3xl cursor-pointer hover:opacity-90",
        className,
      )}
    >
      <p>mc.draimcido.net</p>
    </div>
  );
};

export default IpCopy;
