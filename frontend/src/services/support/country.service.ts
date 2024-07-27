import { axiosConfigWithAuth } from '@configuration';

export interface CountryOption {
  readonly uuid: string;
  readonly name: string;
}

const countryService = {
  getAllSelectOptions: async (): Promise<Array<CountryOption>> => {
    const { data } = await axiosConfigWithAuth.request<Array<CountryOption>>({
      method: 'GET',
      url: 'api/countries/options',
    });

    return data;
  },
};

export default countryService;

