export enum FormTypeE {
  Login,
  Register,
  Reset
}

export type FormComponentPropT = {
  formSelector: (formType: FormTypeE) => void;
  showModal?: () => void;
}
