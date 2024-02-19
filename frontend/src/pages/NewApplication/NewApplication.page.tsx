import { NewApplicationForm } from '@components/page/new-application';
import {
  useGetCountries,
  useGetUniversities,
} from '@hooks/index.ts';

const NewApplicationPage = () => {
  const { countryData, isCountryDataLoading, isCountryDataError } = useGetCountries();
  const { universityData, isUniversityDataLoading, isUniversityDataError } = useGetUniversities();

  return (
    <main>
      {countryData && universityData &&
        <NewApplicationForm
          countryData={countryData}
          universityData={universityData}
        />}
    </main>
  );
};

export default NewApplicationPage;
