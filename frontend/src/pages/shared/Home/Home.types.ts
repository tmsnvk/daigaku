export enum FormTypeE {
  Login,
  Register,
  Reset
}

export type FormSelectorT = {
  formSelector: (formType: FormTypeE) => void;
}

export type ConfirmationModalT = {
  showModal: () => void;
}
