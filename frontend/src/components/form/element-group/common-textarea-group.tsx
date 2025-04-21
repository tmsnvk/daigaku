/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FieldValues } from 'react-hook-form';

/* component imports */
import { CoreFormElementError, CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreTextareaElement } from '../core-element/core-textarea-element.tsx';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
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
  validationRules,
  error,
  id,
  label,
  rows,
  cols,
  placeholder,
  intent,
  isDisabled,
}: CommonTextareaGroupProps<T>): JSX.Element => {
  return (
    <CoreFormElementGroupWrapper className={joinTw('h-120')}>
      <CoreFormElementLabel
        inputId={id}
        label={label}
      />
      <CoreTextareaElement
        validationRules={validationRules}
        id={id}
        placeholder={placeholder}
        rows={rows}
        cols={cols}
        isDisabled={isDisabled}
        isError={error !== undefined}
        intent={intent}
      />
      {error && <CoreFormElementError message={error} />}
    </CoreFormElementGroupWrapper>
  );
};
