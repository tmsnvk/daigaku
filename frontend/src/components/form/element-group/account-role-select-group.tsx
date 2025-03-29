/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component, style imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreSelectElement } from '../core-element/core-select-element';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';
import { removeRolePrefix } from '@utilities';

/* interface, type, enum imports */
import { CoreInputElementStyleIntent, CoreSelectElementGroup, RoleOption } from '@common-types';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 * @template RoleOption - The type representing representing an accountRole option.
 */
interface AccountRoleSelectGroupProps<T extends FieldValues, RoleOption> extends CoreSelectElementGroup<T, RoleOption> {}

/**
 * Renders a select element group instance integrated with the `react-hook-form` library to select a {@link RoleOption}.
 *
 * @param {AccountRoleSelectGroupProps<T extends FieldValues, RoleOption>} props
 * @return {JSX.Element}
 */
export const AccountRoleSelectGroup = <T extends FieldValues>({
  validationRules,
  error,
  id,
  isDisabled,
  options,
}: AccountRoleSelectGroupProps<T, RoleOption>): JSX.Element => {
  return (
    <CoreFormElementGroupWrapper>
      <CoreFormElementLabel
        inputId={id}
        content={l.COMPONENTS.FORM.ACCOUNT_ROLE_DROPDOWN.LABEL}
      />
      <CoreSelectElement
        validationRules={validationRules}
        id={id}
        options={options.map((role: RoleOption) => (
          <option
            key={role.uuid}
            value={role.uuid}
          >
            {removeRolePrefix(role.name)}
          </option>
        ))}
        defaultOption={l.COMPONENTS.FORM.ACCOUNT_ROLE_DROPDOWN.DEFAULT_OPTION}
        isDisabled={isDisabled}
        isError={error !== undefined}
        intent={CoreInputElementStyleIntent.LIGHT}
      />
      {error && <CoreFormElementError message={error} />}
    </CoreFormElementGroupWrapper>
  );
};
