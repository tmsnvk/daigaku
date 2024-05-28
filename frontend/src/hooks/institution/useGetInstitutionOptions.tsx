import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@configuration';
import { institutionService } from '@services/index.ts';

const useGetInstitutionOptions = () => {
  return useQuery({
    queryKey: [queryKeys.INSTITUTIONS.GET_AS_SELECT_OPTIONS],
    queryFn: () => institutionService.getAllSelectOptions(),
  });
};

export default useGetInstitutionOptions;
