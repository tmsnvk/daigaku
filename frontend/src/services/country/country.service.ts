import { AxiosResponse } from 'axios';
import { axiosConfigWithAuth } from '@configuration';

export type CountryOptionT = {
  uuid: string;
  name: string;
}

const countryService = {
  getAllOptions: async (): Promise<AxiosResponse<CountryOptionT[]>> => {
    return await axiosConfigWithAuth.request<CountryOptionT[]>({
      method: 'GET',
      url: 'api/countries/options',
    });
  },
};

export default countryService;

