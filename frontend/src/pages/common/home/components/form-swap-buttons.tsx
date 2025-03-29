/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CoreButton } from '@components/base-components';

/* interface, type, enum imports */
import { FormType } from '../models';

/**
 * Defines the component's properties.
 */
interface FormSwapButtonsProps {
  /**
   * The left button's label string;
   */
  readonly leftButtonLabel: string;

  /**
   * The left button's form type to switch to.
   */
  readonly leftButtonFormType: FormType;

  /**
   * The right button's label string;
   */
  readonly rightButtonLabel: string;

  /**
   * The right button's form type to switch to.
   */
  readonly rightButtonFormType: FormType;

  /**
   * The boolean to govern when the buttons should be disabled.
   */
  readonly isDisabled: boolean;

  /**
   * The method to swap to when one of the button's is clicked.
   *
   * @param formType The type of the form to be selected.
   */
  onFormSelect: (formType: FormType) => void;
}

/**
 * Renders the home page's form bottom section, containing two form switching button elements.
 *
 * @param {FormSwapButtonsProps} props
 * @return {JSX.Element}
 */
export const FormSwapButtons = ({
  leftButtonLabel,
  leftButtonFormType,
  rightButtonLabel,
  rightButtonFormType,
  isDisabled,
  onFormSelect,
}: FormSwapButtonsProps): JSX.Element => {
  return (
    <article className={'flex justify-between mt-40'}>
      <CoreButton
        label={leftButtonLabel}
        intent={'light'}
        isDisabled={isDisabled}
        onClick={() => onFormSelect(leftButtonFormType)}
      />
      <CoreButton
        label={rightButtonLabel}
        intent={'light'}
        isDisabled={isDisabled}
        onClick={() => onFormSelect(rightButtonFormType)}
      />
    </article>
  );
};
