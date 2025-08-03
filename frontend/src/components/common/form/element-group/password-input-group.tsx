/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InputHTMLAttributes, JSX, useState } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useFieldValidationError } from '@daigaku/hooks';

/* component imports */
import { CoreElementError } from '../core-element/core-element-error.tsx';
import { CoreInput, CoreInputVariantIntent } from '../core-element/core-input';
import { CoreLabel } from '../core-element/core-label.tsx';
import { ElementGroupWrapper } from '../form-support/element-group-wrapper.tsx';

/* configuration, constants imports */
import { iconLibrary } from '@daigaku/constants';

/**
 * Defines the component's properties.
 *
 * @template TFormValues - The type of form values extending the `react-hook-form` library.
 */
interface PasswordInputGroupProps<TFormValues extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * The input element's id.
   */
  readonly id: Path<TFormValues>;

  /**
   * The displayed label alongside the input element.
   */
  readonly label: string;

  /**
   * The input element's style intent.
   */
  readonly intent: CoreInputVariantIntent;
}

/**
 * Renders a password input element group instance integrated with the `react-hook-form` library.
 *
 * @param {PasswordInputGroupProps<TFormValues extends FieldValues>} props
 * @return {JSX.Element}
 */
export const PasswordInputGroup = <TFormValues extends FieldValues>({
  id,
  disabled,
  label,
  placeholder,
  defaultValue,
  intent,
}: PasswordInputGroupProps<TFormValues>): JSX.Element => {
  const { t } = useTranslation();

  const { error } = useFieldValidationError<TFormValues>(id);

  const [isPasswordRevealed, setIsPasswordRevealed] = useState<boolean>(false);

  return (
    <ElementGroupWrapper>
      <CoreLabel
        error={!!error}
        inputId={id}
        label={label}
      />
      <div className={'flex w-full items-center text-2xl'}>
        <CoreInput
          className={'flex-1'}
          defaultValue={defaultValue}
          disabled={disabled}
          error={!!error}
          id={id}
          intent={intent}
          placeholder={placeholder}
          type={isPasswordRevealed ? 'text' : 'password'}
        />
        <FontAwesomeIcon
          className={'w-8 cursor-pointer pl-4'}
          icon={isPasswordRevealed ? iconLibrary.faEyeSlash : iconLibrary.faEye}
          onClick={() => {
            setIsPasswordRevealed(!isPasswordRevealed);
          }}
        />
      </div>
      {error && error?.message && <CoreElementError message={t(error.message)} />}
    </ElementGroupWrapper>
  );
};
