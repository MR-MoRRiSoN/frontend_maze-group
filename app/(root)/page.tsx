// app/page.tsx (Server Component)
import { getLocale } from "next-intl/server";
import HomePage from "./HomePage";
import { getProjectsByLocale } from "@/lib/data/projects";

export default async function Page() {
  const locale = await getLocale();
  const projects = getProjectsByLocale(locale);

  return <HomePage projects={projects} />;
}
