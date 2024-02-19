export type NewApplicationFormFieldsT = {
  university: string;
}

export type NewApplicationFormErrorT = {
  response: {
    status: string;
    data: {
      message: string;
    }
  }
}
