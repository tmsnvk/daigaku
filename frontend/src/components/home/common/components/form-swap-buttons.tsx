/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

/* component imports */
import { CoreButton } from '@daigaku/components/common/core';

/* interface, type imports */
import { FormType } from '../types.ts';

/**
 * Defines the component's properties.
 */
interface FormSwapButtonsProps {
  /**
   * The boolean to govern when the buttons should be disabled.
   */
  readonly isDisabled: boolean;

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
   * The method to switch to a different form when one of the buttons is clicked.
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
export const FormSwapButtons = ({ isDisabled, buttonConfig, onFormSelect }: FormSwapButtonsProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <article className={'mt-40 flex justify-between'}>
      <CoreButton
        isDisabled={isDisabled}
        onClick={() => {
          onFormSelect(buttonConfig.leftButton.formType);
        }}
        label={t(buttonConfig.leftButton.label)}
        intent={'light'}
      />
      <CoreButton
        isDisabled={isDisabled}
        onClick={() => {
          onFormSelect(buttonConfig.rightButton.formType);
        }}
        label={t(buttonConfig.rightButton.label)}
        intent={'light'}
      />
    </article>
  );
};
