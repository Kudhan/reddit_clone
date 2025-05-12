"use client";

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "./ui/button";
import reddit_full from "@/images/reddit_full.png";
import reddit from "@/images/reddit.png";
import { Bars2Icon, ChevronLeftIcon } from "@heroicons/react/16/solid";
import { useSidebar } from "./ui/sidebar";

const Header = () => {
  const { user } = useUser();
  const { toggleSidebar, open, isMobile } = useSidebar();

  //const isBanned = user?.publicMetadata["IS_BANNED"] as boolean;

  return (
    <header className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="h-10 flex items-center">
        {/* Sidebar toggle */}
        {open && !isMobile? (
          <ChevronLeftIcon className="w-6 h-6 cursor-pointer" onClick={toggleSidebar} />
        ) : (
          <Bars2Icon className="w-6 h-6 cursor-pointer" onClick={toggleSidebar} />
        )}

        {/* Logo */}
        <Image 
          src={reddit_full}
          alt="Reddit logo"
          width={150}
          height={150}
          className="hidden md:block"
          priority
        />
        <Image  
          src={reddit}
          alt="Reddit icon"
          width={40}
          height={40}
          className="block md:hidden"
          priority
        />
      </div>

      {/* User info and sign-in */}
      <div className="flex items-center gap-x-4">
        {user && <span className="text-sm text-gray-700">Hello, {user.firstName}</span>}
        <SignedIn>
          <UserButton afterSignOutUrl="/" />
        </SignedIn>
        <SignedOut>
          <Button asChild variant="outline">
            <SignInButton />
          </Button>
        </SignedOut>
      </div>
    </header>
  );
};

export default Header;
