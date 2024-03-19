import { useState } from 'react';
import {
  useGetCountries,
  useGetUniversities,
} from '@hooks/index.ts';
import { GlobalErrorModal } from '@components/shared/modal';
import { NewApplicationForm } from '@components/page/new-application';

const NewApplicationPage = () => {
  const [isCountryFieldSelected, setIsCountryFieldSelected] = useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');

  const { countryData, isCountryDataError } = useGetCountries();
  const { universityData, isUniversityDataError } = useGetUniversities(isCountryFieldSelected, selectedCountryId);

  const handleCountryField = (countryId: string) => {
    setIsCountryFieldSelected(true);
    setSelectedCountryId(countryId);
  };

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
