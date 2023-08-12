import * as React from "react";

import { siteConfig } from "@/utils/siteConfig";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Separator } from "./ui/separator";

export function SiteFooter({ className }: React.HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className)}>
      <Separator />
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-12 md:flex-row md:py-0">
        <div className="flex flex-col items-center justify-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Sparkles />
          <span className="text-sm font-bold text-center md:text-left">
            SyllabusAI
          </span>
          <p className="text-center text-sm leading-loose md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Shehab Shalan
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
