/**
 * @prettier
 */

/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { JSX } from 'react';
import { useForm } from 'react-hook-form';

/* logic imports */
import { useCountrySelection, useCreateApplication } from './new-application-form.hooks';

/* component, style imports */
import { CountryDropdown, GenericInput, InputError, InputGuideText, SubmitInput, UniversityDropdown } from '@components/form';
import { LoadingIndicator, PageTitle } from '@components/general';
import { GlobalErrorModal, GlobalLoadingModal, Toast } from '@components/notification';
import { Form } from './new-application-form.styles';

/* configuration, utilities, constants imports */
import { constants } from './new-application-form.constants';

/* interface, type, enum imports */
import { CountryOption, CreateApplicationByStudent, ListQueryResult, UniversityOption } from '@common-types';
import { useGetCountryOptions, useGetUniversityOptionsByCountryUuid } from '@hooks';
import { CountrySelection, CreateApplication } from './new-application-form.models';

/**
 * Renders the new application submission form for student users.
 * The component utilizes the `react-hook-form` library for form handling, including validation,
 * and manages the form submission using the `react-query` library.
 *
 * @return {JSX.Element}
 */
export const NewApplicationForm = (): JSX.Element => {
  const { selectCountry, resetCountrySelection, isCountrySelected, currentCountryUuid }: CountrySelection = useCountrySelection();
  const {
    data: countryOptions,
    isLoading: isCountryDataLoading,
    isError: isCountryError,
  }: ListQueryResult<CountryOption> = useGetCountryOptions();
  const {
    data: universityOptions,
    isLoading: isUniversityDataLoading,
    isError: isUniversityError,
  }: ListQueryResult<UniversityOption> = useGetUniversityOptionsByCountryUuid(isCountrySelected, currentCountryUuid);
  const {
    formState: { errors },
    reset,
    handleSubmit,
    register,
    setError,
  } = useForm<CreateApplicationByStudent>({ mode: 'onSubmit' });
  const { isPending, isSuccess, mutate }: CreateApplication = useCreateApplication(setError, resetCountrySelection, reset);

  if (isCountryDataLoading) {
    return (
      <GlobalLoadingModal
        isVisible={isCountryDataLoading}
        loadingText={constants.pageMessage.LOADING}
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
      <Form
        id={'new-application-form'}
        method={'POST'}
        onSubmit={handleSubmit((formData) => mutate(formData))}
      >
        <PageTitle title={constants.form.TITLE} />
        <InputGuideText paragraphs={constants.form.country.INFORMATION} />
        <CountryDropdown
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.country.REQUIRED,
            },
          }}
          error={errors.countryUuid?.message}
          id={'countryUuid'}
          isDisabled={isPending}
          options={countryOptions ?? []}
          onCountrySelection={selectCountry}
        />
        <InputGuideText paragraphs={constants.form.country.INFORMATION} />
        {isUniversityDataLoading ? (
          <LoadingIndicator loadingText={constants.ui.UNIVERSITY_LOADING} />
        ) : (
          <UniversityDropdown
            register={register}
            validationRules={{
              required: {
                value: true,
                message: constants.validation.university.REQUIRED,
              },
            }}
            error={errors.universityUuid?.message}
            id={'universityUuid'}
            isDisabled={isPending || !isCountrySelected}
            options={universityOptions ?? []}
          />
        )}
        <InputGuideText paragraphs={constants.form.university.INFORMATION} />
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.courseName.REQUIRED,
            },
            pattern: {
              value: /^[\p{L}\s]{5,255}$/u,
              message: constants.validation.courseName.PATTERN,
            },
          }}
          error={errors.courseName?.message}
          id={'courseName'}
          label={constants.form.courseName.LABEL}
          type={'text'}
          placeholder={constants.form.courseName.PLACEHOLDER}
          isDisabled={isPending}
        />
        <InputGuideText paragraphs={constants.form.courseName.INFORMATION} />
        <GenericInput
          register={register}
          validationRules={{
            pattern: {
              value: /^[\p{L}\s]{5,255}$/u,
              message: constants.validation.minorSubject.PATTERN,
            },
          }}
          error={errors.minorSubject?.message}
          id={'minorSubject'}
          label={constants.form.minorSubject.LABEL}
          type={'text'}
          placeholder={constants.form.minorSubject.PLACEHOLDER}
          isDisabled={isPending}
        />
        <InputGuideText paragraphs={constants.form.minorSubject.INFORMATION} />
        <GenericInput
          register={register}
          validationRules={{
            required: {
              value: true,
              message: constants.validation.programmeLength.REQUIRED,
            },
            pattern: {
              value: /^\b[2-5]\b$/,
              message: constants.validation.programmeLength.PATTERN,
            },
          }}
          error={errors.programmeLength?.message}
          id={'programmeLength'}
          label={constants.form.programmeLength.LABEL}
          type={'number'}
          initialValue={3}
          isDisabled={isPending}
        />
        <InputGuideText paragraphs={constants.form.programmeLength.INFORMATION} />
        <article>
          {isPending ? (
            <LoadingIndicator loadingText={constants.ui.LOADING} />
          ) : (
            <SubmitInput
              type={'submit'}
              value={constants.form.SUBMIT}
              disabled={isPending}
            />
          )}
        </article>
        <article>{errors.root && <InputError message={errors.root.message} />}</article>
      </Form>
      <Toast
        isVisible={isSuccess}
        message={constants.ui.SUCCESS_TOAST}
      />
    </>
  );
};
