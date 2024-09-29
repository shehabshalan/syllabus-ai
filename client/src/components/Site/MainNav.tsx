import { Sparkles } from 'lucide-react';
import { siteConfig } from '@/utils/siteConfig';
import { NavItem } from '@/utils/types';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import LoginWithGoogle from './LoginWithGoogle';

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const location = useLocation();
  return (
    <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
      <Link to="/" className="flex items-center space-x-2">
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
                  to={item.href}
                  className={`flex items-center gap:5 text-sm font-medium ${
                    location.pathname === item.href
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  }`}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <LoginWithGoogle />
      </div>
    </div>
  );
}
