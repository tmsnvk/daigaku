import {
  useEffect,
  useState,
} from 'react';
import { NewApplicationForm } from '@components/page/new-application';
import { GlobalErrorModal } from '@components/shared/modal';
import {
  useGetCountries,
  useGetUniversities,
} from '@hooks/index.ts';

const NewApplicationPage = () => {
  const [isCountryFieldSelected, setIsCountryFieldSelected] = useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');

  const { countryData, isCountryDataError } = useGetCountries();
  const { universityData, isUniversityDataLoading, isUniversityDataError, refetch } = useGetUniversities(isCountryFieldSelected, selectedCountryId);

  const handleCountryField = (countryId: string) => {
    setIsCountryFieldSelected(true);
    setSelectedCountryId(countryId);
  };

  useEffect(() => {
    if (isCountryFieldSelected) {
      refetch();
    }
  }, [selectedCountryId]);

  if (isCountryDataError || isUniversityDataError) {
    return <GlobalErrorModal />;
  }

  return (
    <main>
      <NewApplicationForm
        onCountryClick={handleCountryField}
        countryData={countryData ?? []}
        universityData={universityData ?? []}
      />
    </main>
  );
};

export default NewApplicationPage;
