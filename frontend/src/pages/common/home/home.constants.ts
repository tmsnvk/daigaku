/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/* interface, type, enum imports */
import { FormType } from './home.models';

export const confirmationModalFeedback: Partial<Record<FormType, string>> = {
  [FormType.REGISTER]: l.PAGES.COMMON.HOME.NOTIFICATIONS.REGISTRATION,
  [FormType.RESET]: l.PAGES.COMMON.HOME.NOTIFICATIONS.RESET,
};

export const formTypeButtonLabel: Record<FormType, string> = {
  [FormType.LOGIN]: l.PAGES.COMMON.HOME.BUTTONS.LOGIN,
  [FormType.REGISTER]: l.PAGES.COMMON.HOME.BUTTONS.REGISTRATION,
  [FormType.RESET]: l.PAGES.COMMON.HOME.BUTTONS.RESET,
};
