import { connection } from "next/server";
import { getNewsAction } from "@/lib/actions/news/get-news";
import News from "./news";

export default async function NewsSection() {
  await connection();
  const news = await getNewsAction();
  return <News news={news} />;
}
