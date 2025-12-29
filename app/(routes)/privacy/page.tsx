import MarkdownRenderer from "@/app/shared/ui/MarkDownRenderer";
import { getPrivacy } from "./actions/getPrivacy";

export default async function PrivacyPage() {
  const privacy = await getPrivacy();

  return (
    <section className="section mt-13!">
      <div className="relative gradient-bg backdrop-blur-sm rounded-2xl overflow-hidden border border-border/40">
        <div className="absolute top-0 left-0 right-0 h-32 bg-linear-to-b from-primary/5 to-transparent pointer-events-none" />

        <div className="relative p-6 border-b border-border/30">
          <h1 className="text-2xl font-bold text-light-text">
            {privacy?.title || "Тут пока ничего нет"}
          </h1>
        </div>

        <div className="p-6">
          <MarkdownRenderer content={privacy?.content || "Временная пустота"} />
        </div>
      </div>
    </section>
  );
}
