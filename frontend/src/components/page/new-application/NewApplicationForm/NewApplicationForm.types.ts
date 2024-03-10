export type NewApplicationFormFieldsT = {
  country: string;
  university: string;
  majorSubject: string;
  minorSubject: string;
  programmeLength: number;
}

export type NewApplicationFormErrorT = {
  response: {
    status: string;
    data: {
      message: string;
    }
  }
}

