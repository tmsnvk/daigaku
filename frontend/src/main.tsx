import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@context/index.ts';
import Application from './Application.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <Application />
    </AuthProvider>
  </React.StrictMode>,
);
