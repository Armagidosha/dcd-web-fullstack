import Image from "next/image";
import LogoutButton from "@/app/shared/ui/LogoutButton/LogoutButton";
import { auth } from "../../lib/auth";

export default async function DashboardPage() {
  const session = await auth();

  return (
    <div>
      {session && (
        <p>
          {session.user?.email}
          {session.user?.id}
        </p>
      )}
      {session?.user?.image && (
        <Image
          width={100}
          height={100}
          src={session.user.image}
          alt={session.user?.name ?? "avatar"}
        />
      )}
      <LogoutButton />
    </div>
  );
}
