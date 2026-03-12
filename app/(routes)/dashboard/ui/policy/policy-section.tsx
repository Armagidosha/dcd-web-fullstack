import { getPolicyActionPrivate } from "@/lib/actions/policy/get-policy";
import PolicyWidget from "./policy-widget";

export default async function PolicySection() {
  const policies = await getPolicyActionPrivate();
  return <PolicyWidget policies={policies} />;
}
