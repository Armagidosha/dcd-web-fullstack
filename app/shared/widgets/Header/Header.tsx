import { checkRights } from "@/app/lib/actions/utils";
import { CartIcon, HomeIcon, RulesIcon, ShieldIcon } from "../../icons/icons";
import ClientHeader from "./ClientHeader";

const LINKS = [
  {
    title: "Главная",
    path: "/",
    icon: <HomeIcon width={20} height={20} />,
  },
  {
    title: "Донат-услуги",
    path: "/store",
    icon: <CartIcon width={20} height={20} />,
  },
  {
    title: "Правила",
    path: "/rules",
    icon: <RulesIcon width={20} height={20} />,
  },
];

export default async function Header() {
  const haveRights = await checkRights().catch(() => false);

  const links = haveRights
    ? [
        ...LINKS,
        {
          title: "Админка",
          path: "/dashboard",
          icon: <ShieldIcon width={20} height={20} />,
        },
      ]
    : LINKS;

  return <ClientHeader links={links} />;
}
