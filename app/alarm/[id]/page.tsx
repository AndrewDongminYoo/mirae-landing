import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { ANDROID_STORE_URL, IOS_STORE_URL } from "@/lib/site";

export default async function AlarmDetailPage() {
  const headersList = await headers();
  const ua = headersList.get("user-agent") ?? "";

  if (/iPhone|iPad|iPod/.test(ua)) {
    redirect(IOS_STORE_URL);
  }

  if (/Android/.test(ua)) {
    redirect(ANDROID_STORE_URL);
  }

  redirect("/");
}
