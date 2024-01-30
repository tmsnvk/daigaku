export enum FormType {
  Login,
  Register,
  Reset
}

export type ClickHandler = {
  clickHandler: (formType: FormType) => void;
}
