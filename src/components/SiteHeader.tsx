import Link from "next/link";

import { Button } from "@/components/ui/button";
import { MainNav } from "@/components/MainNav";
import { ThemeToggle } from "@/components/ThemeToggle";
import { siteConfig } from "@/utils/siteConfig";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";

export function SiteHeader() {
  const { i18n } = useTranslation();
  const router = useRouter();

  const onToggleLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            <Button onClick={() => onToggleLanguageClick("en")}>EN</Button>
            <Button onClick={() => onToggleLanguageClick("de")}>DE</Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
