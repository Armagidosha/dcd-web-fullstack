import { getRules } from "@/app/lib/actions/rules";
import Rules from "@/app/shared/widgets/Rules/Rules";

export default async function RulesPage() {
  const rules = await getRules();

  return <Rules rules={rules} />;
}
