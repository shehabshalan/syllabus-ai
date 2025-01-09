import { useLocation, useNavigate } from 'react-router';

const useSearch = (key: string) => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);

  const value = searchParams.get(key) || '';

  const handleInputChange = (value: string) => {
    searchParams.set(key, value);
    navigate(`?${searchParams.toString()}`, { replace: true });
  };
  const setSearch = (value: string) => {
    searchParams.set(key, value);
    navigate(`?${searchParams.toString()}`, { replace: true });
  };
  const deleteSearch = () => {
    searchParams.delete(key);
    navigate(`?${searchParams.toString()}`, { replace: true });
  };

  return { value, handleInputChange, deleteSearch, setSearch };
};

export default useSearch;
