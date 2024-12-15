/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* external imports */
import React from 'react';
import ReactDOM from 'react-dom/client';

/* component, style imports */
import { DaigakuReactApplication } from './daigaku-react-application.tsx';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DaigakuReactApplication />
  </React.StrictMode>,
);
