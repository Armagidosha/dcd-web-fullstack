"use client";

import { login } from "@/app/lib/actions/auth";

// TODO: Что-то придумать для страницы входа

export default function SignInPage() {
  return (
    <button type="button" onClick={() => login()}>
      Вход
    </button>
  );
}
