/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CoreFormElementGroupWrapper, CoreFormElementLabel } from '..';
import { CoreDisabledInputElement } from '../core-element/core-disabled-input-element.tsx';

/**
 * Defines the component's properties.
 */
interface DisabledInputGroupProps {
  /**
   * The input's id.
   */
  readonly id: string;

  /**
   * The input's label.
   */
  readonly label: string;

  /**
   * The input's type.
   */
  readonly type: string;

  /**
   * The input's readonly value.
   */
  readonly value: string | number;
}

/**
 * Renders a disabled, readonly input.
 *
 * @param {DisabledInputGroupProps} props
 * @return {JSX.Element}
 */
export const DisabledInputGroup = ({ id, label, type, value }: DisabledInputGroupProps): JSX.Element => {
  return (
    <CoreFormElementGroupWrapper>
      <CoreFormElementLabel
        inputId={id}
        label={label}
      />
      <CoreDisabledInputElement
        type={type}
        id={id}
        name={id}
        initialValue={value}
      />
    </CoreFormElementGroupWrapper>
  );
};
