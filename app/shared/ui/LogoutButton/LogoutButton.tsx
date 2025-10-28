"use client";
import { logout } from "@/app/lib/actions/auth";

export default function LogoutButton() {
  return (
    <button type="button" onClick={() => logout()}>
      logout
    </button>
  );
}
