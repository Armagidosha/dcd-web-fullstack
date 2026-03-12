import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import ProfileWidget from "./profile-widget";

export default async function ProfileSection() {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user;

  return <ProfileWidget user={user} />;
}
