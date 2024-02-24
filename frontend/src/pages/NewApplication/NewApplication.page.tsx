import {
  useEffect,
  useState,
} from 'react';
import { NewApplicationForm } from '@components/page/new-application';
import {
  useGetCountries,
  useGetUniversities,
} from '@hooks/index.ts';

const NewApplicationPage = () => {
  const [isCountryFieldSelected, setIsCountryFieldSelected] = useState<boolean>(false);
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const { countryData, isCountryDataLoading, isCountryDataError } = useGetCountries();
  const { universityData, isUniversityDataLoading, isUniversityDataError, refetch } = useGetUniversities(isCountryFieldSelected, selectedCountry);

  const handleCountryField = (country: string) => {
    setIsCountryFieldSelected(true);
    setSelectedCountry(country);
  };

  useEffect(() => {
    if (isCountryFieldSelected) {
      refetch();
    }
  }, [selectedCountry]);

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
