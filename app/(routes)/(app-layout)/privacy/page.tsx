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

export const metadata = metaConfig.privacy;

export default async function PrivacyPage() {
  const privacy = await getPolicyAction("PRIVACY");

  return (
    <Section className="mt-13">
      <Card>
        <CardHeader>
          <CardTitle>
            <h1 className="text-lg font-semibold">
              Политика конфиденциальности
            </h1>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <MarkdownRenderer>{privacy?.content}</MarkdownRenderer>
        </CardContent>
        <CardFooter>
          <p className="text-muted-foreground">
            Последнее изменение: {privacy.formattedDate}
          </p>
        </CardFooter>
      </Card>
    </Section>
  );
}
