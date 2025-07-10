/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import {
  AuthenticationProvider,
  useAuthenticationProvider,
} from './authentication-provider/authentication.provider.tsx';
import { type Account } from './authentication-provider/authentication.types.ts';
import { ToastProvider, useToastProvider } from './toast-provider/toast.provider.tsx';
import { TranslationProvider } from './translation-provider/translation.provider.tsx';

export {
  Account,
  AuthenticationProvider,
  ToastProvider,
  TranslationProvider,
  useAuthenticationProvider,
  useToastProvider,
};
