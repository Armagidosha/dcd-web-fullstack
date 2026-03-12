import { getRulesAction } from "@/lib/actions/rules/get-rules";
import { metaConfig } from "@/lib/utils/constants/meta";
import Rules from "./rules";

export const metadata = metaConfig.rules;

export default async function RulesPage() {
  const rules = await getRulesAction();

  return <Rules rules={rules} />;
}
