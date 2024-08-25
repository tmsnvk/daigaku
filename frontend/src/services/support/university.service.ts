/**
 * @prettier
 */

import { axiosConfigWithAuth } from '@configuration';

export interface UniversityOption {
  readonly uuid: string;
  readonly name: string;
  readonly abbreviation: string;
}

export const universityService = {
  getDropdownOptionsByCountryUuid: async (selectedCountryUuid: string): Promise<Array<UniversityOption>> => {
    const { data } = await axiosConfigWithAuth.request<Array<UniversityOption>>({
      method: 'GET',
      url: `api/v1/universities/options/${selectedCountryUuid}`,
    });

    return data;
  },
};
