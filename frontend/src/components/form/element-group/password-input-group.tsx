/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX, useState } from 'react';
import { FieldValues } from 'react-hook-form';

/* component, style imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreInputElement } from '../core-element/core-input-element';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@configuration';

/* interface, type, enum imports */
import { PasswordInputElementGroup } from '@common-types';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 */
interface PasswordInputGroupProps<T extends FieldValues> extends PasswordInputElementGroup<T> {}

/**
 * Renders a password input element group instance integrated with the `react-hook-form` library.
 *
 * @param {PasswordInputGroupProps<T>} props
 * @return {JSX.Element}
 */
export const PasswordInputGroup = <T extends FieldValues>({
  validationRules,
  error,
  id,
  label,
  placeholder,
  initialValue,
  isDisabled,
  intent,
}: PasswordInputGroupProps<T>): JSX.Element => {
  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);

  return (
    <CoreFormElementGroupWrapper>
      <CoreFormElementLabel
        inputId={id}
        content={label}
      />
      <div className={'w-full text-2xl'}>
        <CoreInputElement
          validationRules={validationRules}
          id={id}
          type={isPasswordRevealed ? 'text' : 'password'}
          placeholder={placeholder}
          initialValue={initialValue}
          isDisabled={isDisabled}
          isError={error !== undefined}
          intent={intent}
          className={'w-[85%] md:w-[55%]'}
        />
        <FontAwesomeIcon
          onClick={() => setIsPasswordRevealed(!isPasswordRevealed)}
          icon={isPasswordRevealed ? iconLibraryConfig.faEyeSlash : iconLibraryConfig.faEye}
          className={'ml-4 w-8 cursor-pointer'}
        />
      </div>
      {error && <CoreFormElementError message={error} />}
    </CoreFormElementGroupWrapper>
  );
};
