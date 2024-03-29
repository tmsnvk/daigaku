import { useState } from 'react';
import {
  useGetCountryOptions,
  useGetUniversityOptions,
} from '@hooks/index.ts';
import { GlobalErrorModal } from '@components/shared/modal';
import { NewApplicationForm } from '@components/page/new-application';

const NewApplicationPage = () => {
  const [isCountryFieldSelected, setIsCountryFieldSelected] = useState<boolean>(false);
  const [selectedCountryId, setSelectedCountryId] = useState<string>('');

  const { data: countryData, error: isCountryError } = useGetCountryOptions();
  const { data: universityData, error: isUniversityError } = useGetUniversityOptions(isCountryFieldSelected, selectedCountryId);

  const handleCountryField = (countryId: string) => {
    setIsCountryFieldSelected(true);
    setSelectedCountryId(countryId);
  };

  if (isCountryError || isUniversityError) {
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
