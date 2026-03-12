import { metaConfig } from "@/lib/utils/constants/meta";
import { Card, CardContent, CardHeader } from "@/ui/primitives/card";
import LoginViaDiscordButton from "./ui/login-button";

export const metadata = metaConfig.signIn;

export default function SignInPage() {
  return (
    <Card className="m-auto">
      <CardHeader className="text-center">
        <h1 className="font-semibold text-2xl text-gray-400">Вход</h1>
      </CardHeader>
      <CardContent>
        <LoginViaDiscordButton />
      </CardContent>
    </Card>
  );
}
