import {
  FieldValues,
  Path,
  UseFormRegister,
} from 'react-hook-form';

import { BaseInput } from '@components/base-styles';
import {
  InputError,
  InputLabel,
} from '@components/form';

import { ApplicationStatusT } from '@services/status/applicationStatus.service.ts';
import { InterviewStatusT } from '@services/status/interviewStatusService.service.ts';
import { OfferStatusT } from '@services/status/offerStatus.service.ts';
import { ResponseStatusT } from '@services/status/responseStatus.service.ts';
import { FinalDestinationStatusT } from '@services/status/finalDestinationStatus.service.ts';

type SelectOptionsT = ApplicationStatusT | InterviewStatusT | OfferStatusT | ResponseStatusT | FinalDestinationStatusT;

type ComponentPropsT<T extends FieldValues> = {
  register: UseFormRegister<T>,
  fieldError: string | undefined;
  fieldId: Path<T>;
  labelContent: string;
  previouslySelectedValue: string;
  selectPrompt: string;
  options: SelectOptionsT[];
  isReadOnly: boolean;
  onFieldUpdate: (eventTargetValue: string) => void;
}

const ActiveSelectField = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  labelContent,
  previouslySelectedValue,
  selectPrompt,
  options,
  isReadOnly,
  onFieldUpdate,
}: ComponentPropsT<T>) => {
  const defaultOption = options?.filter((option) => option.name === previouslySelectedValue)[0];

  return (
    <BaseInput
      $isError={fieldError !== undefined}
    >
      <InputLabel
        inputId={fieldId}
        content={labelContent}
      />
      <select
        {...register(fieldId, {
          onChange: (event) => onFieldUpdate(event.target.value),
        })}
        id={fieldId}
        name={fieldId}
        disabled={isReadOnly}
        defaultValue={defaultOption?.uuid}
      >
        <option hidden value={''}>{selectPrompt}</option>
        {options.map((option: SelectOptionsT) => <option key={option.uuid} value={option.uuid}>{option.name}</option>)}
      </select>
      {fieldError && <InputError content={fieldError} />}
    </BaseInput>
  );
};

export default ActiveSelectField;
