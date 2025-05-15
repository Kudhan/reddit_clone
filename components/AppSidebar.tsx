// app/components/AppSidebar.tsx
import { getSubreddits } from "@/sanity/lib/subreddit/getSubreddits";
import { AppSidebarClient } from "./AppSidebarClient";

export async function AppSidebar(props: React.ComponentProps<typeof AppSidebarClient>) {
  const subreddits = await getSubreddits();

  return <AppSidebarClient {...props} subreddits={subreddits} />;
}
