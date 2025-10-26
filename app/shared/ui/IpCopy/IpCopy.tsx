import clsx from "clsx";
import st from "./IpCopy.module.scss";

interface IpCopyProps {
  extraClass?: string;
}

const IpCopy = ({ extraClass }: IpCopyProps) => {
  return (
    <div className={clsx(st.ip, extraClass)}>
      <p>mc.draimcido.net</p>
    </div>
  );
};

export default IpCopy;
