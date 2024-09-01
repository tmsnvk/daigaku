/**
 * @prettier
 */

/**
 * @fileoverview
 * @author Tamas N. <dev@tamasnovak.net>
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* interfaces, types, enums */
export enum FormType {
  LOGIN,
  REGISTER,
  RESET,
}

export interface FormSelector {
  readonly formSelector: (formType: FormType) => void;
}

export interface ConfirmationModal {
  readonly showModal: () => void;
}
