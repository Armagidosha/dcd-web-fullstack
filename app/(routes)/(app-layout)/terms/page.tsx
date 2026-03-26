import { getPolicyAction } from "@/lib/actions/policy/get-policy";
import { metaConfig } from "@/lib/utils/constants/meta";
import MarkdownRenderer from "@/ui/components/markdown-renderer";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/ui/primitives/card";
import { Section } from "@/ui/primitives/section";

export const metadata = metaConfig.terms;

export default async function TermsPage() {
  const terms = await getPolicyAction("TERMS");

  return (
    <Section className="mt-13">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-lg font-semibold">
              Пользовательское соглашение
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {terms?.content ? (
            <MarkdownRenderer>{terms.content}</MarkdownRenderer>
          ) : (
            <p className="text-muted-foreground font-semibold">
              Нет политики •︵•
            </p>
          )}
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground">
            Последнее изменение: {terms?.formattedDate || "очень давно"}
          </p>
        </CardFooter>
      </Card>
    </Section>
  );
}
