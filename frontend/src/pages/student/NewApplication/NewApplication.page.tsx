import { useState } from 'react';
import {
  useGetCountryOptions,
  useGetUniversityOptionsByCountryUuid,
} from '@hooks';
import { GlobalErrorModal } from '@components/shared/notification';
import { NewApplicationForm } from '@components/page/new-application';

const NewApplication = () => {
  const [isCountryFieldSelected, setIsCountryFieldSelected] = useState<boolean>(false);
  const [selectedCountryUuid, setSelectedCountryUuid] = useState<string>('');

  const { data: countryData, isError: isCountryError } = useGetCountryOptions();
  const { data: universityData, isError: isUniversityError } = useGetUniversityOptionsByCountryUuid(isCountryFieldSelected, selectedCountryUuid);

  const handleCountryField = (countryUuid: string) => {
    setIsCountryFieldSelected(true);
    setSelectedCountryUuid(countryUuid);
  };

  if (isCountryError || isUniversityError) {
    return <GlobalErrorModal />;
  }

  return (
    <main>
      <NewApplicationForm
        onCountryClick={handleCountryField}
        countryData={countryData?.data ?? []}
        universityData={universityData?.data ?? []}
      />
    </main>
  );
};

export default NewApplication;
