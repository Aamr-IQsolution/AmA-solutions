import { useCallback } from 'react';
import { NavigateOptions, To, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { localizePath } from '../utils/localizePath';

export function useLocalizedNavigate() {
  const navigate = useNavigate();
  const { lang } = useApp();

  return useCallback(
    (to: To | number, options?: NavigateOptions) => {
      if (typeof to === 'number') {
        navigate(to);
        return;
      }

      if (typeof to === 'string') {
        navigate(localizePath(to, lang), options);
        return;
      }

      const pathname = typeof to.pathname === 'string' ? localizePath(to.pathname, lang) : to.pathname;
      navigate({ ...to, pathname }, options);
    },
    [navigate, lang],
  );
}
