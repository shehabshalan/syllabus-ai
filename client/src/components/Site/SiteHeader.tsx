import { siteConfig } from '@/utils/siteConfig';
import { MainNav } from './MainNav';

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <MainNav items={siteConfig.mainNav} />
    </header>
  );
}
