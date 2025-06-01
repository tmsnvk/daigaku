/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { JSX, useState } from 'react';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useFieldValidationError } from '@daigaku/hooks';

/* component imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreInputElement } from '../core-element/core-input-element.tsx';

/* configuration, utilities, constants imports */
import { iconLibrary } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
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
  const { t } = useTranslation();

  const { error } = useFieldValidationError<T>(id);

  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);

  return (
    <CoreFormElementGroupWrapper>
      <CoreFormElementLabel
        inputId={id}
        label={label}
        isError={!!error}
      />
      <div className={joinTw('flex w-full items-center', 'text-2xl')}>
        <CoreInputElement
          id={id}
          type={isPasswordRevealed ? 'text' : 'password'}
          isDisabled={isDisabled}
          isError={!!error}
          placeholder={placeholder}
          initialValue={initialValue}
          intent={intent}
          className={'flex-1'}
        />
        <FontAwesomeIcon
          onClick={() => {
            setIsPasswordRevealed(!isPasswordRevealed);
          }}
          icon={isPasswordRevealed ? iconLibrary.faEyeSlash : iconLibrary.faEye}
          className={joinTw('w-8', 'pl-4', 'cursor-pointer')}
        />
      </div>
      {error && error?.message && <CoreFormElementError message={t(error.message)} />}
    </CoreFormElementGroupWrapper>
  );
};
