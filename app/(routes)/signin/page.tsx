import { metaConfig } from "@/app/shared/utils/constants";
import LoginButton from "./ui/LoginButton";

// TODO: Что-то придумать для страницы входа

export const metadata = metaConfig.signIn;

export default function SignInPage() {
  return <LoginButton />;
}
