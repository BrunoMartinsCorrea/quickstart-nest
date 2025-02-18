import { useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

type DefaultParameters = {
  page?: number,
  size?: number,
  key?: string,
}

type DispatchValue = (value: number | ((prev: number) => number)) => void;
type Pagination = {
  pageIndex: number
  pageSize: number
}

export const usePagination = ({ page: defaultPage = 1, size: defaultSize = 20, key }: DefaultParameters = {}) => {
  const [queryParams, setQueryParams] = useSearchParams();
  const storageKey = `${window.location.pathname}${key ? `-${key}` : ''}-pageSize`
  const prefferedSize = Number(localStorage.getItem(storageKey)) || defaultSize;
  const page = Number(queryParams.get('page') ?? defaultPage);
  const size = Number(queryParams.get('size') ?? prefferedSize);

  const updateQueryParam = useCallback((key: string, value: number | ((prev: number) => number)) => {
    setQueryParams(prev => {
      const newValue = typeof value === 'function' ? value(Number(prev.get(key)) || 0) : value;
      prev.set(key, newValue.toString());
      prev.sort();
      return prev;
    });
  }, [setQueryParams]);

  const setPage: DispatchValue = (value) => updateQueryParam('page', value);
  const setPageSize: DispatchValue = (value) => updateQueryParam('size', value);

  const setPagination = (updaterOrValue: Pagination | ((old: Pagination) => Pagination)) => {
    if (typeof updaterOrValue === 'function') {
      const updater = () => {
        const updated = updaterOrValue({ pageIndex: page - 1, pageSize: size });
        setPage(updated.pageIndex + 1)
        setPageSize(updated.pageSize)
      }
      return updater()
    }
    else {
      setPage(updaterOrValue.pageIndex + 1);
      setPageSize(updaterOrValue.pageSize);
    }
  }

  useEffect(() => {
    localStorage.setItem(storageKey, size.toString());
  }, [size, storageKey])

  return {
    page,
    pageSize: size,
    setPage,
    setPageSize,
    setPagination
  };
}
