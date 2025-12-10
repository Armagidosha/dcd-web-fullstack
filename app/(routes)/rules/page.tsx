import { metaConfig } from "@shared/utils/constants";
import { getRules } from "./actions/rules";
import Rules from "./widgets/Rules";

export const metadata = metaConfig.rules;

export default async function RulesPage() {
  const rules = await getRules();

  return <Rules rules={rules} />;
}
