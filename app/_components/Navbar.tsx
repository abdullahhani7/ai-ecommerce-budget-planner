"use client";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";
import { Package } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CartSheet from "./CartSheet";
// import { Button } from './ui/button'
// import CartSheet from './CartSheet'

function Navbar({ cart }: { cart?: any }) {
  const { user, isLoaded } = useUser();

  return (
    <div className="border-b p-2 bg-white sticky top-0 z-50">
      <div className="container mx-auto h-23 flex items-center justify-between px-4">
        <Link
          href="/"
          className="text-xl font-bold text-emerald-700 flex items-center gap-2"
        >
          <Image width={110} height={110} src="/logo.png" alt="logo" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="hover:text-emerald-600 transition-colors">
            Home
          </Link>

          <Link
            href="/admin"
            className="hover:text-emerald-600 transition-colors"
          >
            Dashboard
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isLoaded && user ? (
            <>
              <UserButton afterSignOutUrl="/">
                <UserButton.MenuItems>
                  <UserButton.Link
                    label="Orders"
                    labelIcon={<Package size={15} />}
                    href="/orders"
                  />
                </UserButton.MenuItems>
              </UserButton>
              <CartSheet initialCart={cart} />
            </>
          ) : (
            isLoaded && (
              <>
                <SignInButton mode="modal">
                  <Button>Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button>Sign Up</Button>
                </SignUpButton>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
