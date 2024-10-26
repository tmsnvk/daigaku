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
import { FieldValues } from 'react-hook-form';

/* component, style imports */
import { BaseInput } from '@components/base-styles';
import { InputError, InputLabel } from '@components/form';

/* configuration, utilities, constants imports */
import { constants } from './institution-dropdown.constants';

/* interface, type, enum imports */
import { DropdownInput } from '@common-types';
import { InstitutionOption } from '@services/support/institution.service';

/**
 * ===============
 * Component {@link InstitutionDropdown}
 * ===============
 */

/**
 * Renders a dropdown input component to select an {@link InstitutionOption}.
 *
 * @param {DropdownInput<T, InstitutionOption>} props
 * @return {JSX.Element}
 *
 * @since 0.0.1
 */
export const InstitutionDropdown = <T extends FieldValues>({
  register,
  validationRules,
  error,
  id,
  isDisabled,
  options,
}: DropdownInput<T, InstitutionOption>): JSX.Element => {
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
          {constants.input.DEFAULT_OPTION}
        </option>
        {options.map((institution: InstitutionOption) => (
          <option
            key={institution.uuid}
            value={institution.uuid}
          >
            {institution.name}
          </option>
        ))}
      </select>
      {error && <InputError message={error} />}
    </BaseInput>
  );
};
