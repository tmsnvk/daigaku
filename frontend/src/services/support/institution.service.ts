import { axiosConfigWithAuth } from '@configuration';

export type InstitutionOptionT = {
  uuid: string;
  city: string;
  name: string;
}

const institutionService = {
  getAllSelectOptions: async (): Promise<InstitutionOptionT[]> => {
    const { data } = await axiosConfigWithAuth.request<InstitutionOptionT[]>({
      method: 'GET',
      url: '/api/institutions/options',
    });

    return data;
  },
};

export default institutionService;
