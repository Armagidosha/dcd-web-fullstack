import { Section } from "@/ui/primitives/section";
import { Skeleton } from "@/ui/primitives/skeleton";

export default function NewsSkeleton() {
  return (
    <Section>
      <Skeleton className="mx-auto h-8 w-60 mb-8" />
      <div className="flex gap-4">
        {[1, 2, 3, 4].map((el) => (
          <Skeleton key={el} className="h-100 grow" />
        ))}
      </div>
    </Section>
  );
}
