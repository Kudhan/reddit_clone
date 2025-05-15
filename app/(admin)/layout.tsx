import { getSubreddits } from "@/sanity/lib/subreddit/getSubreddits"; // Adjust path if needed
import type { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Reddit Sanity Admin Panel",
  description: "Reddit Sanity Admin Panel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch the subreddits on the server side
  const subreddits = await getSubreddits();

  // Log the subreddits to the server console
  console.log("Fetched Subreddits on the server:", subreddits);

  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
