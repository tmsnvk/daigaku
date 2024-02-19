export type NewApplicationFormFieldsT = {
  country: string;
  university: string;
  courseName: string;
}

export type NewApplicationFormErrorT = {
  response: {
    status: string;
    data: {
      message: string;
    }
  }
}

