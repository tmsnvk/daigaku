/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useFieldValidationError } from '@daigaku/hooks';

/* component imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreTextareaElement } from '../core-element/core-textarea-element.tsx';

/* interface, type, enum, schema imports */
import { TextareaElementGroup } from '@daigaku/common-types';

/**
 * Defines the component's properties.
 */
interface CommonTextareaGroupProps<T extends FieldValues> extends TextareaElementGroup<T> {
  /**
   * The textarea's row size.
   */
  readonly rows: number;

  /**
   * The textarea's column size.
   */
  readonly cols: number;
}

/**
 * Renders a generic textarea element group instance integrated with the `react-hook-form` library.
 *
 * @param {CommonTextareaGroupProps<T extends FieldValues>} props
 * @return {JSX.Element}
 */
export const CommonTextareaGroup = <T extends FieldValues>({
  id,
  label,
  rows,
  cols,
  placeholder,
  intent,
  isDisabled,
}: CommonTextareaGroupProps<T>): JSX.Element => {
  const { t } = useTranslation();

  const { error } = useFieldValidationError<T>(id);

  return (
    <CoreFormElementGroupWrapper className={'h-120'}>
      <CoreFormElementLabel
        inputId={id}
        label={label}
        isError={!!error}
      />
      <CoreTextareaElement
        id={id}
        isDisabled={isDisabled}
        isError={!!error}
        rows={rows}
        cols={cols}
        placeholder={placeholder}
        intent={intent}
      />
      {error && error?.message && <CoreFormElementError message={t(error.message)} />}
    </CoreFormElementGroupWrapper>
  );
};
