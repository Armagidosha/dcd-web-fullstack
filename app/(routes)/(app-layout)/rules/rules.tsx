import type { RuleProps } from "@/lib/actions/rules/get-rules";
import MarkdownRenderer from "@/ui/components/markdown-renderer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/primitives/accordion";
import { Card, CardContent } from "@/ui/primitives/card";
import { Section } from "@/ui/primitives/section";

type RulesProps = {
  rules: RuleProps[];
};

export default function Rules({ rules }: RulesProps) {
  return (
    <Section className="relative mt-13">
      <Card>
        <CardContent>
          {rules.length > 0 ? (
            <Accordion type="single" collapsible>
              {rules.map((rule) => (
                <AccordionItem key={rule.order} value={rule.order.toString()}>
                  <AccordionTrigger>{rule.title}</AccordionTrigger>
                  <AccordionContent>
                    <MarkdownRenderer>{rule.content}</MarkdownRenderer>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <p className="font-semibold text-muted-foreground text-center">
              Правил пока нет •︵•
            </p>
          )}
        </CardContent>
      </Card>
    </Section>
  );
}
