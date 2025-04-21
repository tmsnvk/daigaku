/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';

/* component imports */
import { CoreButton } from '@daigaku/components/core';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import { FormType } from '../models';

/**
 * Defines the component's properties.
 */
interface FormSwapButtonsProps {
  /**
   * Configuration data regarding the component's buttons.
   */
  readonly buttonConfig: {
    leftButton: {
      label: string;
      formType: FormType;
    };
    rightButton: {
      label: string;
      formType: FormType;
    };
  };
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
export const FormSwapButtons = ({ buttonConfig, isDisabled, onFormSelect }: FormSwapButtonsProps): JSX.Element => {
  return (
    <article className={joinTw('flex justify-between', 'mt-40')}>
      <CoreButton
        label={buttonConfig.leftButton.label}
        intent={'light'}
        isDisabled={isDisabled}
        onClick={() => onFormSelect(buttonConfig.leftButton.formType)}
      />
      <CoreButton
        label={buttonConfig.rightButton.label}
        intent={'light'}
        isDisabled={isDisabled}
        onClick={() => onFormSelect(buttonConfig.rightButton.formType)}
      />
    </article>
  );
};
