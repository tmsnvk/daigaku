/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, TextareaHTMLAttributes } from 'react';
import { FieldValues, Path } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useFieldValidationError } from '@daigaku/hooks';

/* component imports */
import { CoreElementError } from '../core-element/core-element-error.tsx';
import { CoreLabel } from '../core-element/core-label.tsx';
import { CoreTextarea, CoreTextareaVariantIntent } from '../core-element/core-textarea.tsx';
import { ElementGroupWrapper } from '../form-support/element-group-wrapper.tsx';

/**
 * Defines the component's properties.
 */
interface TextareaGroupProps<TFormValues extends FieldValues> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
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
  readonly intent: CoreTextareaVariantIntent;
}

/**
 * Renders a generic textarea element group instance integrated with the `react-hook-form` library.
 *
 * @param {TextareaGroupProps<TFormValues extends FieldValues>} props
 * @return {JSX.Element}
 */
export const TextareaGroup = <TFormValues extends FieldValues>({
  id,
  label,
  rows,
  cols,
  placeholder,
  intent,
  disabled,
}: TextareaGroupProps<TFormValues>): JSX.Element => {
  const { t } = useTranslation();

  const { error } = useFieldValidationError<TFormValues>(id);

  return (
    <ElementGroupWrapper className={'h-120'}>
      <CoreLabel
        error={!!error}
        inputId={id}
        label={label}
      />
      <CoreTextarea
        cols={cols}
        disabled={disabled}
        error={!!error}
        id={id}
        intent={intent}
        placeholder={placeholder}
        rows={rows}
      />
      {error && error?.message && <CoreElementError message={t(error.message)} />}
    </ElementGroupWrapper>
  );
};
