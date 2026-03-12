"use client";

import { Home, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import ImageWithFallback from "@/ui/components/image-with-fallback";
import { Button } from "@/ui/primitives/button";
import { Card, CardContent } from "@/ui/primitives/card";

type ProfileWidgetProps = {
  user?: {
    image: string | null | undefined;
    email: string;
    name: string;
    discordId: string | undefined;
  };
};

export default function ProfileWidget({ user }: ProfileWidgetProps) {
  const router = useRouter();

  return (
    <div className="h-full flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardContent className="p-6 flex flex-col items-center gap-6">
          <div className="aspect-square rounded-full overflow-hidden">
            <ImageWithFallback
              width={96}
              height={96}
              src={user?.image}
              alt="User avatar"
            />
          </div>

          <div className="text-center">
            <p className="text-xl font-semibold">
              {" "}
              @{user?.name || "неизвестный"}
            </p>
            <p className="text-sm text-muted-foreground">
              {user?.email || "draimcido@gmail.dcd"}
            </p>
          </div>

          <div className="w-full flex flex-col gap-3">
            <Link href="/" className="w-full">
              <Button
                variant="secondary"
                className="cursor-pointer w-full gap-2"
              >
                <Home className="h-4 w-4" />
                Главная
              </Button>
            </Link>

            <Button
              variant="destructive"
              className="w-full gap-2"
              onClick={() =>
                authClient.signOut({
                  fetchOptions: {
                    onSuccess: () => {
                      router.replace("/");
                    },
                  },
                })
              }
            >
              <LogOut className="h-4 w-4" />
              Выйти
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
