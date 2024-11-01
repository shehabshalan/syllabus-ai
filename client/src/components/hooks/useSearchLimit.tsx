import { useState } from 'react';

export const useSearchLimit = () => {
  const LIMIT = 5;
  const [searchCount, setSearchCount] = useState<number>(() => {
    const count = localStorage.getItem('searchCount');
    return count ? parseInt(count) : 0;
  });

  const incrementSearchCount = () => {
    if (searchCount >= LIMIT) {
      return;
    }
    const newCount = searchCount + 1;
    setSearchCount(newCount);
    localStorage.setItem('searchCount', newCount.toString());
  };

  const canSearch = searchCount < LIMIT;

  return { searchCount, canSearch, incrementSearchCount };
};
