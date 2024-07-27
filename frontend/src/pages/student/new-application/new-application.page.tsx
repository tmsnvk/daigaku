import { useState } from 'react';

import {
  CountryOptions,
  useGetCountryOptions,
} from '@hooks/country/use-get-country-options';
import {
  UniversityOptionsByCountryUuid,
  useGetUniversityOptionsByCountryUuid,
} from '@hooks/university/use-get-university-options-by-country-uuid';

import { GlobalErrorModal } from '@components/notification';
import { NewApplicationForm } from './components';

const NewApplication = () => {
  const [isCountryFieldSelected, setIsCountryFieldSelected] = useState<boolean>(false);
  const [selectedCountryUuid, setSelectedCountryUuid] = useState<string>('');

  const { data: countryData, isError: isCountryError }: CountryOptions = useGetCountryOptions();

  const {
    data: universityData,
    isLoading: isUniversityDataLoading,
    isError: isUniversityError,
  }: UniversityOptionsByCountryUuid = useGetUniversityOptionsByCountryUuid({ isCountryFieldSelected, selectedCountryUuid });

  const handleCountryField = (countryUuid: string): void => {
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
