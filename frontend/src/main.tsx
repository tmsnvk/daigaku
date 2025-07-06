/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

/* component imports */
import { DaigakuReactApplication } from './application/daigaku-application.tsx';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <DaigakuReactApplication />
  </StrictMode>,
);
