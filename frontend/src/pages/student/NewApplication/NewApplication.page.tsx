import { useState } from 'react';
import { useGetCountryOptions } from '@hooks/country';
import { useGetUniversityOptionsByCountryUuid } from '@hooks/university';
import { GlobalErrorModal } from '@components/notification';
import { NewApplicationForm } from './components';

const NewApplication = () => {
  const [isCountryFieldSelected, setIsCountryFieldSelected] = useState<boolean>(false);
  const [selectedCountryUuid, setSelectedCountryUuid] = useState<string>('');

  const { data: countryData, isError: isCountryError, error: countryError } = useGetCountryOptions();
  const { data: universityData, isError: isUniversityError, error: universityError } = useGetUniversityOptionsByCountryUuid(isCountryFieldSelected, selectedCountryUuid);

  const handleCountryField = (countryUuid: string) => {
    setIsCountryFieldSelected(true);
    setSelectedCountryUuid(countryUuid);
  };

  if ((isCountryError || isUniversityError)) {
    let errorMessage = '';

    if (countryError) {
      errorMessage += `${countryError.message} '\n'}`;
    }

    if (universityError) {
      errorMessage += universityError.message;
    }

    return <GlobalErrorModal error={errorMessage} />;
  }

  return (
    <main>
      <NewApplicationForm
        handleCountryClick={handleCountryField}
        countryData={countryData ?? []}
        universityData={universityData ?? []}
      />
    </main>
  );
};

export default NewApplication;
