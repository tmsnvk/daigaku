/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { BaseButton } from '@components/base-styles';
import { FormType } from '../models';

/**
 * Defines the component's properties.
 */
interface ComponentProps {
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
 * The home page's form bottom section, containing two form switching buttons.
 *
 * @param {ComponentProps} props
 * @return {JSX.Element}
 */
export const FormSwapButtons = ({
  leftButtonLabel,
  leftButtonFormType,
  rightButtonLabel,
  rightButtonFormType,
  isDisabled,
  onFormSelect,
}: ComponentProps): JSX.Element => {
  return (
    <article className={'flex justify-between mt-40'}>
      <BaseButton
        label={leftButtonLabel}
        intent={'light'}
        disabled={isDisabled}
        onClick={() => onFormSelect(leftButtonFormType)}
      />
      <BaseButton
        label={rightButtonLabel}
        intent={'light'}
        disabled={isDisabled}
        onClick={() => onFormSelect(rightButtonFormType)}
      />
    </article>
  );
};
