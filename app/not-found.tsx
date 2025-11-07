import Link from "next/link";
import { metadata as metadataConfig } from "@/app/shared/utils/constants";

export const metadata = metadataConfig.notFound;

const NotFound = () => {
  return (
    <section className="section grid place-items-center h-screen">
      <div className="flex flex-col items-center">
        <span className="text-6xl text-shadow-primary text-shadow-[0.25rem_0.25rem] font-bold animate-bounce">
          404
        </span>
        <h1 className="mt-4 text-lg font-semibold">
          Ты нашёл секретное место.
        </h1>
        <p className="max-w-124 text-center">
          К сожалению, это всего лишь страница с ошибкой 404. Возможно, ошибка в
          написании адреса, или страница была перемещена на другой URL.
        </p>
        <Link
          className="px-8 py-2 mt-4 rounded-3xl bg-primary transition-opacity hover:opacity-90"
          href={"/"}
        >
          На главную
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
