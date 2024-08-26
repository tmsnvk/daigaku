/**
 * @prettier
 */

import { axiosConfigWithAuth } from '@configuration';

export interface InstitutionOption {
  readonly uuid: string;
  readonly city: string;
  readonly name: string;
}

export const institutionService = {
  getAllDropdownOptions: async (): Promise<Array<InstitutionOption>> => {
    const { data } = await axiosConfigWithAuth.request<Array<InstitutionOption>>({
      method: 'GET',
      url: '/api/v1/institutions/options',
    });

    return data;
  },
};
