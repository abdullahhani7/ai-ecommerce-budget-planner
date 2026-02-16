"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background border-t py-12 text-sm text-muted-foreground">
      <div className="mx-auto px-14">
        {/* Top */}
        <div className="flex flex-col md:flex-row md:justify-between gap-10">
          {/* Branding */}
          <div>
             <h3 className="text-lg font-semibold">
              AI<span style={{ color: "var(--color-emerald-400)" }}> Planner</span>
            </h3>
            <p className="mt-2 max-w-xs text-muted-foreground">
              Fresh groceries and smart AI-powered shopping at your fingertips.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-10">
            <div className="space-y-2">
              <p className="font-medium">Product</p>
              <div className="flex gap-3">
                <Link href="#" className="hover:text-foreground">
                  Pricing
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Features
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Docs
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Company</p>
              <div className="flex gap-3 flex-wrap">
                <Link href="#" className="hover:text-foreground">
                  About
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Contact
                </Link>
                <Link href="#" className="hover:text-foreground">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px w-full bg-border" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-4">
          <span>
            © {new Date().getFullYear()} EcoCart. All rights reserved.
          </span>

          {/* Social Icons */}
          <div className="flex gap-4">
            <Link href="#" className="hover:text-foreground">
              <Facebook className="h-5 w-5" strokeWidth={2} />
            </Link>
            <Link href="#" className="hover:text-foreground">
              <Twitter className="h-5 w-5" strokeWidth={2} />
            </Link>
            <Link href="#" className="hover:text-foreground">
              <Instagram className="h-5 w-5" strokeWidth={2} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
