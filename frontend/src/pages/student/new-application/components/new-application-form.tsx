/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

/* logic imports */
import { useGetCountryOptions, useGetUniversityOptionsByCountryUuid } from '@hooks';
import { useCountrySelection, useCreateApplication } from '../hooks';

/* component, style imports */
import {
  CommonInputGroup,
  CoreFormAction,
  CoreFormElementInstruction,
  CoreFormHeader,
  CoreFormWrapper,
  CountrySelectGroup,
  UniversitySelectGroup,
} from '@components/form';
import { LoadingIndicator } from '@components/general';
import { GlobalErrorModal, LoadingModal, Toast } from '@components/notification';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/* interface, type, enum imports */
import {
  CoreInputElementStyleIntent,
  CoreSelectElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
  CreateApplicationByStudent,
} from '@common-types';

/**
 * Renders the new application submission form for student users.
 * The component utilizes the `react-hook-form` library for form handling, including validation,
 * and manages the form submission using the `react-query` library.
 *
 * @return {JSX.Element}
 */
export const NewApplicationForm = (): JSX.Element => {
  const { selectCountry, resetCountrySelection, isCountrySelected, currentCountryUuid } = useCountrySelection();
  const { data: countryOptions, isLoading: isCountryLoading, isError: isCountryError } = useGetCountryOptions();
  const {
    data: universityOptions,
    isLoading: isUniversityLoading,
    isError: isUniversityError,
  } = useGetUniversityOptionsByCountryUuid(isCountrySelected, currentCountryUuid);

  const methods = useForm<CreateApplicationByStudent>({ mode: 'onSubmit' });
  const {
    formState: { errors },
    reset,
    handleSubmit,
    setError,
  } = methods;

  const { isPending, isSuccess, mutate } = useCreateApplication(setError, resetCountrySelection, reset);

  if (isCountryLoading) {
    return (
      <LoadingModal
        isVisible={isCountryLoading}
        status={l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.PAGE_LOADING}
      />
    );
  }

  if (isCountryError || isUniversityError) {
    return (
      <GlobalErrorModal
        isVisible={isCountryError || isUniversityError}
        onCloseModal={() => console.log('FIX ME')}
      />
    );
  }

  return (
    <>
      <section className={'core-tertiary-border w-9/10 md:w-8/10 my-[5%] 2xl:max-w-[100rem]'}>
        <FormProvider {...methods}>
          <CoreFormWrapper
            formId={'post-application-form'}
            onFormSubmit={handleSubmit((formData: CreateApplicationByStudent) => {
              mutate(formData);
            })}
            className={'core-application-grid'}
          >
            <CoreFormHeader
              title={l.PAGES.STUDENT.NEW_APPLICATION.FORM.TITLE}
              intent={'largeWithUnderline'}
              className={'col-start-1 col-end-3'}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COUNTRY.INFORMATION}
              className={'col-start-1 col-end-3'}
            />
            <CountrySelectGroup
              id={'countryUuid'}
              validationRules={{
                required: {
                  value: true,
                  message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.COUNTRY.VALIDATION.REQUIRED,
                },
              }}
              error={errors.countryUuid?.message}
              isDisabled={isPending}
              options={countryOptions ?? []}
              onCountrySelect={selectCountry}
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COUNTRY.INFORMATION} />
            {isUniversityLoading ? (
              <LoadingIndicator loadingText={l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.UNIVERSITY_LOADING} />
            ) : (
              <UniversitySelectGroup
                id={'universityUuid'}
                validationRules={{
                  required: {
                    value: true,
                    message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.UNIVERSITY.VALIDATION.REQUIRED,
                  },
                }}
                error={errors.universityUuid?.message}
                isDisabled={isPending || !isCountrySelected}
                options={universityOptions ?? []}
                intent={CoreSelectElementStyleIntent.LIGHT}
              />
            )}
            <CoreFormElementInstruction paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.UNIVERSITY.INFORMATION} />
            <CommonInputGroup
              id={'courseName'}
              validationRules={{
                required: {
                  value: true,
                  message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.VALIDATION.REQUIRED,
                },
                pattern: {
                  value: /^[\p{L}\s]{5,255}$/u,
                  message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.VALIDATION.PATTERN,
                },
              }}
              error={errors.courseName?.message}
              label={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.LABEL}
              type={'text'}
              placeholder={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.PLACEHOLDER}
              isDisabled={isPending}
              intent={CoreInputElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.INFORMATION} />
            <CommonInputGroup
              id={'minorSubject'}
              validationRules={{
                pattern: {
                  value: /^[\p{L}\s]{5,255}$/u,
                  message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.MINOR_SUBJECT.VALIDATION.PATTERN,
                },
              }}
              error={errors.minorSubject?.message}
              label={l.PAGES.STUDENT.NEW_APPLICATION.FORM.MINOR_SUBJECT.LABEL}
              type={'text'}
              placeholder={l.PAGES.STUDENT.NEW_APPLICATION.FORM.MINOR_SUBJECT.PLACEHOLDER}
              isDisabled={isPending}
              intent={CoreInputElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.MINOR_SUBJECT.INFORMATION} />
            <CommonInputGroup
              id={'programmeLength'}
              validationRules={{
                required: {
                  value: true,
                  message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.PROGRAMME_LENGTH.VALIDATION.REQUIRED,
                },
                pattern: {
                  value: /^\b[2-5]\b$/,
                  message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.PROGRAMME_LENGTH.VALIDATION.PATTERN,
                },
              }}
              error={errors.programmeLength?.message}
              label={l.PAGES.STUDENT.NEW_APPLICATION.FORM.PROGRAMME_LENGTH.LABEL}
              type={'number'}
              initialValue={3}
              isDisabled={isPending}
              intent={CoreInputElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.PROGRAMME_LENGTH.INFORMATION} />
            <CoreFormAction
              isSubmissionPending={isPending}
              submissionMessage={l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.FORM_SUBMIT_LOADING}
              submitId={'post-application-form'}
              submissionValue={l.PAGES.STUDENT.NEW_APPLICATION.FORM.SUBMIT}
              errorMessage={errors.root?.message}
              submitButtonStyleIntent={CoreSubmitInputElementStyleIntent.DARK}
              className={'col-start-1 col-end-3'}
            />
          </CoreFormWrapper>
        </FormProvider>
      </section>
      <Toast
        isVisible={isSuccess}
        message={l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.SUCCESS_TOAST}
      />
    </>
  );
};
