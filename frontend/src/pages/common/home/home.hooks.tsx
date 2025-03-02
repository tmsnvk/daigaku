/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX, useMemo, useState } from 'react';

/* component imports */
import { LoginForm, RegistrationForm, ResetForm } from './components';

/* interface, type, enum imports */
import { FormType } from './home.models';

/**
 * Defines the return values for the {@link useActiveFormComponent} hook.
 */
interface ActiveFormComponent {
  /**
   * The currently selected {@link FormType}.
   */
  readonly activeFormType: FormType;

  /**
   * The currently rendered component.
   */
  readonly activeFormComponent: JSX.Element;
}

/**
 * A helper method used by {@link useActiveFormComponent} to retrieve the appropriate form component based on the provided {@link FormType}.
 *
 * @param activeFormType The current {@link FormType} that determines which component is rendered.
 * @param selectFormTypeHandler The method to change the rendered form component.
 * @param showModal The method to trigger a modal component attached to the currently active form component.
 * @return {JSX.Element} The form component corresponding to the selected {@link FormType}.
 */
const getActiveFormComponent = (
  activeFormType: FormType,
  selectFormTypeHandler: (formType: FormType) => void,
  showModal: () => void,
): JSX.Element => {
  switch (activeFormType) {
    case FormType.REGISTER:
      return (
        <RegistrationForm
          onFormSelect={selectFormTypeHandler}
          showModal={showModal}
        />
      );

    case FormType.RESET:
      return (
        <ResetForm
          onFormSelect={selectFormTypeHandler}
          showModal={showModal}
        />
      );

    default:
      return <LoginForm onFormSelect={selectFormTypeHandler} />;
  }
};

/**
 * Selects and renders a form component based on the active {@link FormType}.
 * The form component options are:
 * - {@link RegistrationForm}
 * - {@link LoginForm}
 * - {@link ResetForm}
 *
 * @param showModal The method to trigger a modal component attached to the currently active form component.
 * @return {ActiveFormComponent}
 */
export const useActiveFormComponent = (showModal: () => void): ActiveFormComponent => {
  const DEFAULT_FORM_TYPE = FormType.LOGIN;
  const [activeFormType, setActiveFormType] = useState<FormType>(DEFAULT_FORM_TYPE);

  const selectFormTypeHandler = (formType: FormType): void => {
    setActiveFormType(formType);
  };

  const activeFormComponent: JSX.Element = useMemo(() => {
    return (
      <section
        key={activeFormType}
        className={
          'base-light-border w-[85%] flex flex-col justify-between my-[5%] px-10 py-20 text-center animate-(--animate-fade-in-from-bottom) sm:w-200'
        }
      >
        {getActiveFormComponent(activeFormType, selectFormTypeHandler, showModal)}
      </section>
    );
  }, [activeFormType]);

  return {
    activeFormType,
    activeFormComponent,
  };
};
