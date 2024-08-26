/**
 * @prettier
 */

import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

import { ApplicationStatus } from '@services/status/application-status.service';
import { InterviewStatus } from '@services/status/interview-status-service.service';
import { OfferStatus } from '@services/status/offer-status.service';
import { ResponseStatus } from '@services/status/response-status.service';
import { FinalDestinationStatus } from '@services/status/final-destination-status.service';

type SelectOptions = ApplicationStatus | InterviewStatus | OfferStatus | ResponseStatus | FinalDestinationStatus;

interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  fieldError: string | undefined;
  fieldId: Path<T>;
  labelContent: string;
  previouslySelectedValue: string;
  selectPrompt: string;
  options: Array<SelectOptions>;
  isReadOnly: boolean;
  onFieldUpdate: (eventTargetValue: string) => void;
}

export const ActiveSelectField = <T extends FieldValues>({
  register,
  fieldError,
  fieldId,
  labelContent,
  previouslySelectedValue,
  selectPrompt,
  options,
  isReadOnly,
  onFieldUpdate,
}: ComponentProps<T>) => {
  const defaultOption: SelectOptions = options?.filter((option: SelectOptions) => option.name === previouslySelectedValue)[0];

  return (
    <BaseInput $isError={fieldError !== undefined}>
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
        <option
          hidden
          value={''}
        >
          {selectPrompt}
        </option>
        {options.map((option: SelectOptions) => {
          return (
            <option
              key={option.uuid}
              value={option.uuid}
            >
              {option.name}
            </option>
          );
        })}
      </select>
      {fieldError && <InputError content={fieldError} />}
    </BaseInput>
  );
};
