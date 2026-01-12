/**
 * هذا الملف هو نقطة انطلاق التطبيق (Entry Point).
 * يقوم بتهيئة مكتبة React وربط المكون الرئيسي (App) بعنصر HTML الأساسي في الصفحة،
 * كما يضمن تحميل التطبيق بشكل صحيح داخل المتصفح.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);