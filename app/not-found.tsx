import Link from "next/link";
import { metadata as metadataConfig } from "@/constants";
import st from "./not-found.module.scss";
import Section from "./shared/ui/Section/Section";

export const metadata = metadataConfig.notFound;

const NotFound = () => {
  return (
    <Section fullH>
      <div className={st.notFound}>
        <span className={st.label}>404</span>
        <h1 className={st.title}>Ты нашёл секретное место.</h1>
        <p className={st.description}>
          К сожалению, это всего лишь страница с ошибкой 404. Возможно, ошибка в
          написании адреса, или страница была перемещена на другой URL.
        </p>
        <Link href={"/"}>
          <button type="button" className={st.toHome}>
            На главную
          </button>
        </Link>
      </div>
    </Section>
  );
};

export default NotFound;
