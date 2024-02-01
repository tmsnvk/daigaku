export enum FormTypeT {
  Login,
  Register,
  Reset
}

export type ClickHandlerT = {
  clickHandler: (formType: FormTypeT) => void;
}
