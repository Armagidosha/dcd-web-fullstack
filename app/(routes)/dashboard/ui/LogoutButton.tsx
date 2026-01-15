"use client";
import { logout } from "@/app/lib/actions/auth";
import { LogoutIcon } from "../../../shared/icons/icons";

export default function LogoutButton() {
  return (
    <button
      type="button"
      className={`flex items-center gap-2 px-8 py-3 rounded-full bg-primary cursor-pointer
        transition-[color, transform]  duration-300 hover:bg-primary/80 hover:scale-103`}
      onClick={() => logout()}
    >
      <LogoutIcon width={18} height={18} />
    </button>
  );
}
