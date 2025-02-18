/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import React from 'react';
import { createRoot } from 'react-dom/client';

/* component, style imports */
import { DaigakuReactApplication } from './daigaku-react-application.tsx';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <DaigakuReactApplication />
  </React.StrictMode>,
);
