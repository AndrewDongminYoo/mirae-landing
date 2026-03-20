import { headers } from "next/headers";
import { redirect } from "next/navigation";

const IOS_STORE_URL = "https://apps.apple.com/app/id6758120543";
const ANDROID_STORE_URL = "https://play.google.com/store/apps/details?id=kr.mirae.app";

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
