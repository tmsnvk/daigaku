/**
 * @prettier
 */

import { useState } from 'react';

import { useGetCountryOptions, useGetUniversityOptionsByCountryUuid } from '@hooks/index';

import { GlobalErrorModal } from '@components/notification';
import { NewApplicationForm } from './components';

import { CountryOptions } from '@hooks/country/use-get-country-options';
import { UniversityOptionsByCountryUuid } from '@hooks/university/use-get-university-options-by-country-uuid';

export const NewApplication = () => {
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

  if (isCountryError || isUniversityError) {
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
