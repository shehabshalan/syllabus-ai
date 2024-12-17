import { Menu, Sparkles } from 'lucide-react';
import { siteConfig } from '@/utils/siteConfig';
import { Link, useLocation } from 'react-router-dom';
import LoginWithGoogle from '../../features/Auth/LoginWithGoogle';
import { useMe } from '@/api/apiHooks/user/user';
import { getToken } from '@/utils/utils';
import ThemeToggle from '../theme/ThemeToggle';
import { cn } from '@/lib/utils';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { useState } from 'react';

const SiteHeader = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { isLoading, data, error } = useMe({
    query: {
      enabled: getToken() ? true : false,
    },
  });

  if (error) {
    localStorage.getItem('token') && localStorage.removeItem('token');
  }

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Sparkles />
          <span className="inline-block font-bold">{siteConfig.name}</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {siteConfig.mainNav.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  to={item.href}
                  className={cn(
                    'flex items-center text-sm font-medium',
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <ThemeToggle />
          {isLoading ? null : data ? (
            <Link to="/profile" className="text-sm font-medium">
              Profile
            </Link>
          ) : (
            <LoginWithGoogle />
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" onClick={() => setIsOpen(true)} />
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="flex flex-col gap-4">
              {siteConfig.mainNav.map(
                (item, index) =>
                  item.href && (
                    <Link
                      onClick={() => setIsOpen(false)}
                      key={index}
                      to={item.href}
                      className={cn(
                        'text-sm font-medium',
                        location.pathname === item.href
                          ? 'text-primary'
                          : 'text-muted-foreground'
                      )}
                    >
                      {item.title}
                    </Link>
                  )
              )}
              <Separator className="my-4" />
              <div className="flex flex-col gap-4">
                {isLoading ? null : data ? (
                  <Link
                    to="/profile"
                    className="text-sm font-medium"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                ) : (
                  <LoginWithGoogle />
                )}
                <ThemeToggle />
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default SiteHeader;
