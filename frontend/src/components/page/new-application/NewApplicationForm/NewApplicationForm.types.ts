export type UniversitiesT = {
  uuid: string;
  name: string;
  abbreviation: string;
  countryCode: string;
}

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

