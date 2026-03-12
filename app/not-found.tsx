import Link from "next/link";
import { metaConfig } from "@/lib/utils/constants/meta";

export const metadata = metaConfig.notFound;

const NotFound = () => {
  return (
    <section className="grid place-items-center h-screen">
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
          className="px-8 py-2 mt-4 rounded-3xl bg-primary transition hover:opacity-90 hover:scale-103"
          href={"/"}
        >
          На главную
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
