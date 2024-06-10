import { useState } from 'react';
import { useGetCountryOptions } from '@hooks/country';
import { useGetUniversityOptionsByCountryUuid } from '@hooks/university';
import { GlobalErrorModal } from '@components/notification';
import { NewApplicationForm } from './components';

const NewApplication = () => {
  const [isCountryFieldSelected, setIsCountryFieldSelected] = useState<boolean>(false);
  const [selectedCountryUuid, setSelectedCountryUuid] = useState<string>('');

  const { data: countryData, isError: isCountryError } = useGetCountryOptions();
  const {
    data: universityData,
    isLoading: isUniversityDataLoading,
    isError: isUniversityError,
  } = useGetUniversityOptionsByCountryUuid(isCountryFieldSelected, selectedCountryUuid);

  const handleCountryField = (countryUuid: string) => {
    setIsCountryFieldSelected(true);
    setSelectedCountryUuid(countryUuid);
  };

  if ((isCountryError || isUniversityError)) {
    return <GlobalErrorModal />;
  }

  return (
    <main>
      <NewApplicationForm
        handleCountryClick={handleCountryField}
        countryData={countryData ?? []}
        universityData={universityData ?? []}
        isUniversityDataLoading={isUniversityDataLoading}
      />
    </main>
  );
};

export default NewApplication;
