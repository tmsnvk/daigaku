import { axiosConfigWithAuth } from '@configuration';

export type CountryOptionT = {
  uuid: string;
  name: string;
}

const countryService = {
  getAllSelectOptions: async (): Promise<CountryOptionT[]> => {
    const { data } = await axiosConfigWithAuth.request<CountryOptionT[]>({
      method: 'GET',
      url: 'api/countries/options',
    });

    return data;
  },
};

export default countryService;

