import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { useGetOfferStatuses } from '@hooks/applications';
import {
  ErrorMessage,
  InputFieldStyles,
  InputLabel,
  LoadingIndicator,
} from '@components/shared/form';
import { OfferStatusT } from '@hooks/applications/useGetOfferStatuses.tsx';

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  defaultValue: string;
}

const SelectOfferStatus = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  defaultValue,
}: ComponentPropsT<T>) => {
  const { data, isLoading, isError } = useGetOfferStatuses();

  if (isLoading) {
    return <LoadingIndicator content={'Loading form options.'} />;
  }

  if (isError) {
    return <ErrorMessage content={'An error has occurred. Refresh the page or reach out via \'Feedback\'.'} />;
  }

  return (
    <InputFieldStyles $isError={fieldError !== undefined}>
      <InputLabel inputId={fieldId} content={'Offer Status'} />
      <select
        {...register(fieldId)}
        id={fieldId}
        name={fieldId}
        defaultValue={defaultValue}
      >
        {defaultValue ?? <option hidden value={''}>Update the application`&apos;`s interview status.</option>}
        {data && data.map((option: OfferStatusT) => {
          return <option key={option.uuid} value={option.uuid}>{`${option.name}`}</option>;
        })}
      </select>
      {fieldError && <ErrorMessage content={fieldError} />}
    </InputFieldStyles>
  );
};

export default SelectOfferStatus;
