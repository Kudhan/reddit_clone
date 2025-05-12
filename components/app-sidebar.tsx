"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { FlameIcon, GalleryVerticalEnd, Minus, Plus, TrendingUpIcon } from "lucide-react";
import { SearchForm } from "@/components/search-form";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import reddit_full from "@/images/reddit_full.png";
import { useSidebar } from "./ui/sidebar"; // Adjust if needed
import clsx from "clsx";
import { HomeIcon } from "@heroicons/react/16/solid";

// Corrected type for SidebarData
type SidebarData = {
  navMain: {
    title: string;
    url: string;
    items: {
      title: string;
      url: string;
      isActive: boolean;
    }[];
  }[];
};

// Sample data
const sidebardata: SidebarData = {
  navMain: [
    {
      title: "Communities",
      url: "#",
      items: [
        { title: "Installation", url: "#", isActive: false },
        { title: "Project Structure", url: "#", isActive: false },
      ],
    },
    // You can add other sections here
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open, isMobile, setOpen } = useSidebar();
  //const subreddits = await getSubreddits();

  return (
    <>
      {/* Overlay for mobile */}
      {isMobile && open && (
        <div
          className="fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
        />
      )}

      <Sidebar
        {...props}
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r transition-transform duration-300 ease-in-out",
          {
            "-translate-x-full": isMobile && !open,
            "translate-x-0": open || !isMobile,
          }
        )}
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link href="/">
                  <Image
                    src={reddit_full}
                    alt="logo"
                    width={150}
                    height={150}
                    className="object-contain"
                  />
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SearchForm />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                {/*create community */}
                </SidebarMenuButton>
                <SidebarMenuButton asChild className="p-5">
                  <Link href="/">
                  <HomeIcon className="w-4 h-4 mr-2"/>
                  Home
                    
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuButton asChild className="p-5">
                  <Link href="/popular">
                  <TrendingUpIcon className="w-4 h-4 mr-2" />
                  Popular
                  </Link>
                </SidebarMenuButton>

                <SidebarMenuButton asChild className="p-5">
                  <Link href="/hot">
                  <FlameIcon className="w-4 h-4 mr-2" />
                  Hot/Controversal
                  </Link>
                </SidebarMenuButton>

              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarMenu>
              {sidebardata.navMain.map((item, index) => (
                <Collapsible
                  key={item.title}
                  defaultOpen={index === 1}
                  className="group/collapsible"
                >
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        {item.title}
                        <Plus className="ml-auto group-data-[state=open]/collapsible:hidden" />
                        <Minus className="ml-auto group-data-[state=closed]/collapsible:hidden" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>
                    {item.items?.length ? (
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.items.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.title}>
                              <SidebarMenuSubButton
                                asChild
                                isActive={subItem.isActive}
                              >
                                <a href={subItem.url}>{subItem.title}</a>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    ) : null}
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>

        <SidebarRail />
      </Sidebar>
    </>
  );
}
