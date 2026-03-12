import { ClipboardList, House, Shield, ShoppingCart } from "lucide-react";
import { Suspense } from "react";
import { checkRights } from "@/lib/actions/check-rights";
import ClientHeader from "./client-header";

const LINKS = [
  {
    title: "Главная",
    path: "/",
    Icon: <House width={20} height={20} />,
  },
  {
    title: "Донат-услуги",
    path: "/store",
    Icon: <ShoppingCart width={20} height={20} />,
  },
  {
    title: "Правила",
    path: "/rules",
    Icon: <ClipboardList width={20} height={20} />,
  },
];

export default function HeaderWrapper() {
  return (
    <Suspense fallback={<ClientHeader links={LINKS} />}>
      <Header />
    </Suspense>
  );
}

async function Header() {
  const { success: haveRights } = await checkRights();

  const links = haveRights
    ? [
        ...LINKS,
        {
          title: "Админка",
          path: "/dashboard",
          Icon: <Shield width={20} height={20} />,
        },
      ]
    : LINKS;

  return <ClientHeader links={links} />;
}
