export type RegisterFormFieldsT = {
  fullName: string;
  email: string;
}

export type RegisterFormReturnDataT = {

}

export type RegisterFormErrorT = {
  response: {
    status: string;
    data: {
      message: string;
    }
  }
}
