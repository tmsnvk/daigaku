import { axiosConfigWithAuth } from '@configuration';

export interface InstitutionOption {
  readonly uuid: string;
  readonly city: string;
  readonly name: string;
}

const institutionService = {
  getAllSelectOptions: async (): Promise<Array<InstitutionOption>> => {
    const { data } = await axiosConfigWithAuth.request<Array<InstitutionOption>>({
      method: 'GET',
      url: '/api/institutions/options',
    });

    return data;
  },
};

export default institutionService;
