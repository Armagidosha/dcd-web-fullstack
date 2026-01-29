import Paper from "@/app/shared/ui/Paper";
import { metaConfig } from "@/app/shared/utils/constants";
import LoginButton from "./ui/LoginButton";

// TODO: Что-то придумать для страницы входа

export const metadata = metaConfig.signIn;

export default function SignInPage() {
  return (
    <Paper
      className="py-6 px-10 m-auto text-center max-w-2xl space-y-5"
      withBorder
      withGradient
    >
      <h1 className="font-semibold text-4xl text-gray-400">Вход</h1>
      <LoginButton />
    </Paper>
  );
}
