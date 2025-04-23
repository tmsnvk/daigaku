/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX, useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';

/* component imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreInputElement } from '../core-element/core-input-element.tsx';

/* configuration, utilities, constants imports */
import { iconLibraryConfig } from '@daigaku/configuration';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { PasswordInputElementGroup } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 *
 * @template T - The type of form values extending the `react-hook-form` library.
 */
interface PasswordInputGroupProps<T extends FieldValues> extends PasswordInputElementGroup<T> {}

/**
 * Renders a password input element group instance integrated with the `react-hook-form` library.
 *
 * @param {PasswordInputGroupProps<T extends FieldValues>} props
 * @return {JSX.Element}
 */
export const PasswordInputGroup = <T extends FieldValues>({
  id,
  isDisabled,
  label,
  placeholder,
  initialValue,
  intent,
}: PasswordInputGroupProps<T>): JSX.Element => {
  const { formState } = useFormContext();
  const error = formState.errors[id]?.message;

  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);

  return (
    <CoreFormElementGroupWrapper>
      <CoreFormElementLabel
        inputId={id}
        label={label}
      />
      <div className={joinTw('w-full', 'text-2xl')}>
        <CoreInputElement
          id={id}
          type={isPasswordRevealed ? 'text' : 'password'}
          isDisabled={isDisabled}
          isError={error !== undefined}
          placeholder={placeholder}
          initialValue={initialValue}
          intent={intent}
          className={joinTw('w-[85%] md:w-[60%]')}
        />
        <FontAwesomeIcon
          onClick={() => {
            setIsPasswordRevealed(!isPasswordRevealed);
          }}
          icon={isPasswordRevealed ? iconLibraryConfig.faEyeSlash : iconLibraryConfig.faEye}
          className={joinTw('w-8', 'pl-4', 'cursor-pointer')}
        />
      </div>
      {error && <CoreFormElementError message={error as string} />}
    </CoreFormElementGroupWrapper>
  );
};
