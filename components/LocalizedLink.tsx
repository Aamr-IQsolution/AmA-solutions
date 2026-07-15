import React from 'react';
import {
  Link,
  LinkProps,
  NavLink,
  NavLinkProps,
  Navigate,
  NavigateProps,
} from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { localizePath } from '../utils/localizePath';

function resolveLocalizedTo(to: LinkProps['to'], lang: ReturnType<typeof useApp>['lang']): LinkProps['to'] {
  if (typeof to === 'string') {
    return localizePath(to, lang);
  }

  if (typeof to === 'object' && to !== null && 'pathname' in to && typeof to.pathname === 'string') {
    return { ...to, pathname: localizePath(to.pathname, lang) };
  }

  return to;
}

export const LocalizedLink: React.FC<LinkProps> = ({ to, ...props }) => {
  const { lang } = useApp();
  return <Link to={resolveLocalizedTo(to, lang)} {...props} />;
};

export const LocalizedNavLink: React.FC<NavLinkProps> = ({ to, ...props }) => {
  const { lang } = useApp();
  return <NavLink to={resolveLocalizedTo(to, lang)} {...props} />;
};

interface LocalizedNavigateProps extends Omit<NavigateProps, 'to'> {
  to: string;
}

export const LocalizedNavigate: React.FC<LocalizedNavigateProps> = ({ to, ...props }) => {
  const { lang } = useApp();
  return <Navigate to={localizePath(to, lang)} {...props} />;
};
