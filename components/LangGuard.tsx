import React from 'react';
import { Navigate, Outlet, useParams } from 'react-router-dom';
import { DEFAULT_LANG, isSupportedLang } from '../utils/localizePath';

const LangGuard: React.FC = () => {
  const { lang } = useParams();

  if (!lang || !isSupportedLang(lang)) {
    return <Navigate to={`/${DEFAULT_LANG}`} replace />;
  }

  return <Outlet />;
};

export default LangGuard;
