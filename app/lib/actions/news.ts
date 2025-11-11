"use server";

export const getNews = async () => {
  const res = await fetch(`${process.env.URL}/api/news`);

  if (!res.ok) return { news: [] };
  return res.json().then((data) => data.data);
};
