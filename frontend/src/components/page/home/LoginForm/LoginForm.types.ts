export type LoginFormFieldsT = {
  email: string;
  password: string;
}

export type LoginFormReturnDataT = {

}

export type LoginFormErrorT = {
  response: {
    status: string;
    data: {
      message: string;
    }
  }
}
