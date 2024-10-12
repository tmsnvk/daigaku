/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

/* external imports */
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { constants } from './university-dropdown.constants';

/* interface, type, enum imports */
import { FormFieldValidation } from '@common-types';
import { UniversityOption } from '@services/support/university.service';

/**
 * ===============
 * Component {@link UniversityDropdown}
 * ===============
 */

/**
 * The interface represents the properties of the {@link UniversityDropdown} component.
 *
 * @since 0.0.1
 */
interface ComponentProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  validationRules?: FormFieldValidation;
  error: string | undefined;
  id: Path<T>;
  isDisabled: boolean;
  universityOptions: Array<UniversityOption>;
}

/**
 * A dropdown component to select an institution.
 *
 * @param {ComponentProps<T extends FieldValues>} props
 * @param props.register `react-hook-form` register method.
 * @param props.validationRules Validation rules for `react-hook-form` validation handling.
 * @param props.error Error message if any.
 * @param props.id The id of the input field.
 * @param props.isDisabled The disabled status of the input field.
 * @param props.institutions The list of institutions that should be available in the dropdown field.
 *
 * @returns {JSX.Element}
 *
 * @since 0.0.1
 */
export const UniversityDropdown = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  isDisabled,
  universityOptions,
}: ComponentProps<T>): JSX.Element => {
  return (
    <BaseInput $isError={error !== undefined}>
      <InputLabel
        inputId={id}
        labelText={constants.input.LABEL_TEXT}
      />
      <select
        {...register(id, validationRules)}
        id={id}
        name={id}
        disabled={isDisabled}
      >
        <option
          hidden
          value={''}
        >
          {constants.input.DEFAULT_VALUE}
        </option>
        {universityOptions.map((universityOption: UniversityOption) => (
          <option
            key={universityOption.uuid}
            value={universityOption.uuid}
          >
            {`${universityOption.name} - ${universityOption.abbreviation}`}
          </option>
        ))}
      </select>
      {error && <InputError message={error} />}
    </BaseInput>
  );
};
