export enum FormTypeE {
  LOGIN,
  REGISTER,
  RESET
}

export type FormSelectorT = {
  formSelector: (formType: FormTypeE) => void;
}

export type ConfirmationModalT = {
  showModal: () => void;
}
