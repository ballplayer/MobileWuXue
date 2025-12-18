import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { registerSW } from 'virtual:pwa-register';

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

// Register the PWA service worker (vite-plugin-pwa provides the virtual helper)
if ('serviceWorker' in navigator) {
  // immediate: true will try to register right away in dev/production
  registerSW({ immediate: true });
}