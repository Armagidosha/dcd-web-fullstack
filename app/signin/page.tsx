import { RedirectType, redirect } from "next/navigation";

export default function SignInPage() {
  redirect("/", RedirectType.replace);
}
