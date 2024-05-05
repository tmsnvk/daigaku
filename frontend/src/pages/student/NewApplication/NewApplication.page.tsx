import { useState } from 'react';
import { AxiosError } from 'axios';
import {
  useGetCountryOptions,
  useGetUniversityOptionsByCountryUuid,
} from '@hooks';
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

    if (countryError instanceof AxiosError) {
      errorMessage += `${countryError?.response?.data.root} '\n'}`;
    }

    if (universityError instanceof AxiosError) {
      errorMessage += universityError?.response?.data.root;
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
