"use client";
import * as React from "react";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { siteConfig } from "@/utils/siteConfig";
import { cn } from "@/lib/utils";
import { NavItem } from "../../global";
import { useTranslation } from "next-i18next";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <Sparkles />
        <span className="inline-block font-bold">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {t(item.title)}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  );
}
