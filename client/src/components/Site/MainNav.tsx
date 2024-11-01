import { Sparkles } from 'lucide-react';
import { siteConfig } from '@/utils/siteConfig';
import { NavItem } from '@/utils/types';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import LoginWithGoogle from './LoginWithGoogle';
import { useMe } from '@/api/apiHooks/user/user';
import { getToken } from '@/utils/utils';

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  const location = useLocation();
  const { isLoading, data, error } = useMe({
    query: {
      enabled: getToken() ? true : false,
    },
  });

  if (error) {
    localStorage.getItem('token') && localStorage.removeItem('token');
  }

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
        {isLoading ? null : data ? (
          <Link to="/profile" className="text-sm font-medium">
            Profile
          </Link>
        ) : (
          <LoginWithGoogle />
        )}
      </div>
    </div>
  );
}
