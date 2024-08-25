/**
 * @prettier
 */

import { useState } from 'react';

import { useGetCountryOptions, useGetUniversityOptionsByCountryUuid } from '@hooks/index';

import { GlobalErrorModal } from '@components/notification';
import { NewApplicationForm } from './components';

import { CountryOption } from '@services/support/country.service';
import { UniversityOption } from '@services/support/university.service';
import { ListQueryResult } from '@common-types';

export const NewApplication = () => {
  const [isCountryFieldSelected, setIsCountryFieldSelected] = useState<boolean>(false);
  const [selectedCountryUuid, setSelectedCountryUuid] = useState<string>('');

  const { data: countryData, isError: isCountryError }: ListQueryResult<CountryOption> = useGetCountryOptions();

  const {
    data: universityData,
    isLoading: isUniversityDataLoading,
    isError: isUniversityError,
  }: ListQueryResult<UniversityOption> = useGetUniversityOptionsByCountryUuid(isCountryFieldSelected, selectedCountryUuid);

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
