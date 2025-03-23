/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useGetCountryOptions, useGetUniversityOptionsByCountryUuid } from '@hooks';
import { useCountrySelection, useCreateApplication } from '../hooks';

/* component, style imports */
import { CoreInputError, CountryDropdown, InputGuideText, SubmitInput, UniversityDropdown } from '@components/form';
import { LoadingIndicator } from '@components/general';
import { GlobalErrorModal, GlobalLoadingModal, Toast } from '@components/notification';

/* configuration, utilities, constants imports */
import { localization as l } from '@constants';

/* interface, type, enum imports */
import { CreateApplicationByStudent } from '@common-types';
import { CommonInputGroup } from '@components/form/common-input-group';

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
  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
    setError,
  } = useForm<CreateApplicationByStudent>({ mode: 'onSubmit' });
  const { isPending, isSuccess, mutate } = useCreateApplication(setError, resetCountrySelection, reset);

  if (isCountryLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isCountryLoading}
        loadingText={l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.PAGE_LOADING}
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
      <form
        id={'new-application-form'}
        className={'base-application-grid base-tertiary-border'}
        onSubmit={handleSubmit((formData) => mutate(formData))}
      >
        <h1 className={'form-title-head col-start-1 col-end-3 text-center'}>{l.PAGES.STUDENT.NEW_APPLICATION.FORM.TITLE}</h1>
        <InputGuideText
          className={'col-start-1 col-end-3'}
          paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COUNTRY.INFORMATION}
        />
        <CountryDropdown
          register={register}
          validationRules={{
            required: {
              value: true,
              message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.COUNTRY.VALIDATION.REQUIRED,
            },
          }}
          error={errors.countryUuid?.message}
          id={'countryUuid'}
          isDisabled={isPending}
          options={countryOptions ?? []}
          onCountrySelection={selectCountry}
        />
        <InputGuideText paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COUNTRY.INFORMATION} />
        {isUniversityLoading ? (
          <LoadingIndicator loadingText={l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.UNIVERSITY_LOADING} />
        ) : (
          <UniversityDropdown
            register={register}
            validationRules={{
              required: {
                value: true,
                message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.UNIVERSITY.VALIDATION.REQUIRED,
              },
            }}
            error={errors.universityUuid?.message}
            id={'universityUuid'}
            isDisabled={isPending || !isCountrySelected}
            options={universityOptions ?? []}
          />
        )}
        <InputGuideText paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.UNIVERSITY.INFORMATION} />
        <CommonInputGroup
          register={register}
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
          id={'courseName'}
          label={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.LABEL}
          type={'text'}
          placeholder={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.PLACEHOLDER}
          isDisabled={isPending}
        />
        <InputGuideText paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.INFORMATION} />
        <CommonInputGroup
          register={register}
          validationRules={{
            pattern: {
              value: /^[\p{L}\s]{5,255}$/u,
              message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.MINOR_SUBJECT.VALIDATION.PATTERN,
            },
          }}
          error={errors.minorSubject?.message}
          id={'minorSubject'}
          label={l.PAGES.STUDENT.NEW_APPLICATION.FORM.MINOR_SUBJECT.LABEL}
          type={'text'}
          placeholder={l.PAGES.STUDENT.NEW_APPLICATION.FORM.MINOR_SUBJECT.PLACEHOLDER}
          isDisabled={isPending}
        />
        <InputGuideText paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.MINOR_SUBJECT.INFORMATION} />
        <CommonInputGroup
          register={register}
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
          id={'programmeLength'}
          label={l.PAGES.STUDENT.NEW_APPLICATION.FORM.PROGRAMME_LENGTH.LABEL}
          type={'number'}
          initialValue={3}
          isDisabled={isPending}
        />
        <InputGuideText paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.PROGRAMME_LENGTH.INFORMATION} />
        <article className={'col-start-1 col-end-3'}>
          {isPending ? (
            <LoadingIndicator loadingText={l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.FORM_SUBMIT_LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              value={l.PAGES.STUDENT.NEW_APPLICATION.FORM.SUBMIT}
              disabled={isPending}
            />
          )}
        </article>
        <article className={'col-start-1 col-end-3 h-10'}>{errors.root && <CoreInputError message={errors.root.message} />}</article>
      </form>
      <Toast
        isVisible={isSuccess}
        message={l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.SUCCESS_TOAST}
      />
    </>
  );
};
