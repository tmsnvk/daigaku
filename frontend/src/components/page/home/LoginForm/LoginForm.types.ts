export type LoginFormFieldsT = {
  email: string;
  password: string;
}

export type LoginFormUserDataT = {

}

export type LoginFormErrorT = {
  response: {
    status: string;
    data: {
      message: string;
    }
  }
}
