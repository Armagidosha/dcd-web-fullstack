"use client";

import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { LogoutIcon } from "@/ui/icons/ui.icons";

export default function LogoutButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className={`flex items-center gap-2 px-8 py-3 rounded-full bg-primary cursor-pointer
        transition-[color, transform]  duration-300 hover:bg-primary/80 hover:scale-103`}
      onClick={() =>
        authClient.signOut({
          fetchOptions: {
            onSuccess: () => {
              router.push("/");
            },
          },
        })
      }
    >
      <LogoutIcon width={18} height={18} />
    </button>
  );
}
