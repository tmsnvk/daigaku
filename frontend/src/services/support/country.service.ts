/**
 * @prettier
 */

/* external imports */
import { axiosConfigWithAuth } from '@configuration';

/* interfaces, types, enums */
export interface CountryOption {
  readonly uuid: string;
  readonly name: string;
}

export const countryService = {
  /*
   * TODO - comment
   */
  getAllDropdownOptions: async (): Promise<Array<CountryOption>> => {
    const { data } = await axiosConfigWithAuth.request<Array<CountryOption>>({
      method: 'GET',
      url: 'api/v1/countries/options',
    });

    return data;
  },
};
