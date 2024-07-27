export enum FormType {
  LOGIN,
  REGISTER,
  RESET
}

export interface FormSelector {
  readonly formSelector: (formType: FormType) => void;
}

export interface ConfirmationModal {
  readonly showModal: () => void;
}
