import { getRulesActionPrivate } from "@/lib/actions/rules/get-rules";
import RulesWidget from "./rules-widget";

export default async function RulesSection() {
  const rules = await getRulesActionPrivate();
  return <RulesWidget rules={rules} />;
}
