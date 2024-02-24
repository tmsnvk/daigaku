export type NewApplicationFormFieldsT = {
  country: string;
  university: string;
  majorSubject: string;
}

export type NewApplicationFormErrorT = {
  response: {
    status: string;
    data: {
      message: string;
    }
  }
}

