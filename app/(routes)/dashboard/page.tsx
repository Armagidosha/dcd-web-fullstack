import { Suspense } from "react";
import { metaConfig } from "@/lib/utils/constants/meta";
import { Section } from "@/ui/primitives/section";
import PolicySection from "./ui/policy/policy-section";
import PolicyCardSkeleton from "./ui/policy/policy-skeleton";
import ProductCardSkeleton from "./ui/product/product-skeleton";
import ProductsSection from "./ui/product/products-section";
import ProfileSection from "./ui/profile/profile-section";
import ProfileSkeleton from "./ui/profile/profile-skeleton";
import RulesSection from "./ui/rules/rules-section";
import { RulesCardSkeleton } from "./ui/rules/rules-skeleton";

export const metadata = metaConfig.dashboard;

export default function DashboardPage() {
  return (
    <Section className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2">
        <Suspense fallback={<ProfileSkeleton />}>
          <ProfileSection />
        </Suspense>
        <Suspense fallback={<RulesCardSkeleton />}>
          <RulesSection />
        </Suspense>
      </div>

      <Suspense fallback={<PolicyCardSkeleton />}>
        <PolicySection />
      </Suspense>

      <Suspense fallback={<ProductCardSkeleton />}>
        <ProductsSection />
      </Suspense>
    </Section>
  );
}
