/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useTranslation } from 'react-i18next';

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
   * The boolean to govern when the buttons should be disabled.
   */
  readonly isDisabled: boolean;

  /**
   * The method to switch to a different form when one of the buttons is clicked.
   *
   * @param formType The type of the form to be selected.
   */
  onFormSelect: (formType: FormType) => void;

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
}

/**
 * Renders the home page's form bottom section, containing two form switching button elements.
 *
 * @param {FormSwapButtonsProps} props
 * @return {JSX.Element}
 */
export const FormSwapButtons = ({ isDisabled, onFormSelect, buttonConfig }: FormSwapButtonsProps): JSX.Element => {
  const { t } = useTranslation();

  return (
    <article className={joinTw('flex justify-between', 'mt-40')}>
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
