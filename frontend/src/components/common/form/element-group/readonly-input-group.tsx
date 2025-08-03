/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { ElementGroupWrapper } from '../form-support/element-group-wrapper.tsx';

/**
 * Defines the component's properties.
 */
interface ReadOnlyInputGroupProps {
  /**
   * The input's label.
   */
  readonly label: string;

  /**
   * The input's readonly default value.
   */
  readonly value: string | number;
}

/**
 * Renders a disabled, readonly input.
 *
 * @param {ReadOnlyInputGroupProps} props
 * @return {JSX.Element}
 */
export const ReadOnlyInputGroup = ({ label, value }: ReadOnlyInputGroupProps): JSX.Element => {
  return (
    <ElementGroupWrapper>
      <div
        className={
          'z-1 rounded-(--default-border-radius) bg-secondary text-primary absolute top-[-0.75rem] ml-6 px-4 text-lg font-semibold tracking-widest'
        }
      >
        {label}
      </div>
      <div className={'bg-accent border-secondary h-20 w-full rounded-xl border-2 px-4 pt-6 text-xl'}>{value}</div>
    </ElementGroupWrapper>
  );
};
