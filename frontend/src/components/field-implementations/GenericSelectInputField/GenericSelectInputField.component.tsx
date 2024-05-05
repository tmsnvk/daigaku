import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';
import {
  InputError,
  InputFieldStyles,
  InputLabel,
} from '@components/form';
import { ApplicationStatusT } from '@services/application/applicationStatus.service.ts';
import { InterviewStatusT } from '@services/application/interviewStatusService.service.ts';
import { OfferStatusT } from '@services/application/offerStatus.service.ts';
import { ResponseStatusT } from '@services/application/responseStatus.service.ts';
import { FinalDestinationStatusT } from '@services/application/finalDestinationStatus.service.ts';

type SelectOptionsT = ApplicationStatusT | InterviewStatusT | OfferStatusT | ResponseStatusT | FinalDestinationStatusT;

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  labelContent: string;
  defaultValue: string;
  defaultOptionFieldContent: string;
  options: SelectOptionsT[];
}

const GenericSelectInputField = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  labelContent,
  defaultValue,
  defaultOptionFieldContent,
  options,
}: ComponentPropsT<T>) => {
  const defaultOption = options?.filter((option) => option.name === defaultValue)[0];

  return (
    <InputFieldStyles $isError={fieldError !== undefined}>
      <InputLabel inputId={fieldId} content={labelContent} />
      <select
        {...register(fieldId)}
        id={fieldId}
        name={fieldId}
      >
        {
          defaultValue ?
            <option hidden value={defaultOption.uuid}>{defaultOption.name}</option> :
            <option hidden value={''}>{defaultOptionFieldContent}</option>
        }
        {options.map((option: SelectOptionsT) => {
          return <option key={option.uuid} value={option.uuid}>{option.name}</option>;
        })}
      </select>
      {fieldError && <InputError content={fieldError} />}
    </InputFieldStyles>
  );
};

export default GenericSelectInputField;