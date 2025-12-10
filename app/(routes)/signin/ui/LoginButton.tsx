"use client";
import { login } from "@/app/lib/actions/auth";

export default function LoginButton() {
  return (
    <button type="button" onClick={() => login()}>
      login
    </button>
  );
}
