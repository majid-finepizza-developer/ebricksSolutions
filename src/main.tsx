import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from './theme/ThemeProvider';
import { ContentProvider } from './context/ContentProvider';
import { initModernPlatformPolyfills } from './utils/polyfills';
import App from './App';
import './index.css';

// Load conditional polyfills strictly when native platform features are absent.
initModernPlatformPolyfills();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <ContentProvider>
        <App />
      </ContentProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
