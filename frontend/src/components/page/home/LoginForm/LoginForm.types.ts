import { AccountDataT } from '@context/AuthContext.tsx';

export type LoginFormFieldsT = {
  email: string;
  password: string;
}

export type LoginFormReturnDataT = {
  accountDataDto: AccountDataT,
  jwtResponse: {
    jwt: string;
    email: string;
    roles: string[];
  }
}

export type LoginFormErrorT = {
  response: {
    status: string;
    data: {
      message: string;
    }
  }
}
