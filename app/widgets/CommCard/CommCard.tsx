import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import st from "./CommCard.module.scss";

const CommCard = () => {
  return (
    <div className={clsx(st.comm, "container")}>
      <div className={st.container}>
        <Image
          width={250}
          height={375}
          src="/images/ban.png"
          alt="Техническая поддержка"
        />
        <div className={st.text}>
          <h3 className="text-lg">Жалобы и апелляции</h3>
          <p className="text-md">
            Обнаружили нарушение правил или считаете блокировку несправедливой?
            Зайдите в Discord-сервер проекта и отправьте жалобу в{" "}
            <Link
              className={st.link}
              target="blank"
              href={"https://discord.gg/v3r9MscDaq"}
            >
              канал
            </Link>
            .
          </p>
        </div>
      </div>
      <div className={st.container}>
        <Image
          width={250}
          height={375}
          src="/images/support.png"
          alt="Техническая поддержка"
        />
        <div className={st.text}>
          <h3 className="text-lg">Поддержка</h3>
          <p className="text-md">
            Возникла техническая проблема или нужна помощь? Перейдите в наш
            Discord-сервер и создайте обращение в{" "}
            <Link
              className={st.link}
              target="blank"
              href={"https://discord.gg/v3r9MscDaq"}
            >
              канале{" "}
            </Link>
            поддержки.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CommCard;
