export type RegisterFormFieldsT = {
  firstName: string;
  lastName: string;
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
