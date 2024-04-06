import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import { useGetResponseStatus } from '@hooks/applications';
import {
  ErrorMessage,
  InputFieldStyles,
  InputLabel,
  LoadingIndicator,
} from '@components/shared/form';
import { ResponseStatusT } from '@hooks/applications/useGetResponseStatus.tsx';

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  defaultValue: string;
}

const SelectResponseStatus = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  defaultValue,
}: ComponentPropsT<T>) => {
  const { data, isLoading, isError } = useGetResponseStatus();

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
        {defaultValue ?? <option hidden value={''}>Update the application`&apos;`s university response status.</option>}
        {data && data.map((option: ResponseStatusT) => {
          return <option key={option.uuid} value={option.uuid}>{`${option.name}`}</option>;
        })}
      </select>
      {fieldError && <ErrorMessage content={fieldError} />}
    </InputFieldStyles>
  );
};

export default SelectResponseStatus;
