import type { Metadata } from "next";

import React from "react";

export const metadata: Metadata = {
  title: "Reddit Sanity Admin Panel",
  description: "Reddit Sanity Admin Panel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body >
          {children}
        </body>
      </html>
    
  );
}
