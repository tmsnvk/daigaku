/**
 * @prettier
 */

/* external imports */
import { axiosConfigWithAuth } from '@configuration';

/* interfaces, types, enums */
export interface InstitutionOption {
  readonly uuid: string;
  readonly city: string;
  readonly name: string;
}

export const institutionService = {
  /*
   * TODO - comment
   */
  getAllDropdownOptions: async (): Promise<Array<InstitutionOption>> => {
    const { data } = await axiosConfigWithAuth.request<Array<InstitutionOption>>({
      method: 'GET',
      url: '/api/v1/institutions/options',
    });

    return data;
  },
};
