/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useGetCountryOptions, useGetUniversityOptionsByCountryUuid } from '@daigaku/hooks';
import { useCountrySelection } from '../hooks/use-country-selection.tsx';
import { useCreateApplication } from '../hooks/use-create-application.tsx';

/* component imports */
import {
  CommonInputGroup,
  CommonSelectGroup,
  CoreFormAction,
  CoreFormElementInstruction,
  CoreFormHeader,
  CoreFormWrapper,
} from '@daigaku/components/form';

/* configuration, utilities, constants imports */
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum, schema imports */
import {
  CoreInputElementStyleIntent,
  CoreSelectElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
  CountryOption,
  CreateApplicationRecordByStudentPayload,
  UniversityOption,
} from '@daigaku/common-types';
import { FormInputValues, formValidationSchema } from '../schema.ts';

/**
 * Renders the new application submission form for student users.
 * The component utilizes the `react-hook-form` library for form handling, including validation,
 * and manages the form submission using the `react-query` library.
 *
 * @return {JSX.Element}
 */
export const CreateApplicationRecordForm = (): JSX.Element => {
  const { t } = useTranslation();

  const { handleCountrySelection, resetCountrySelection, isCountrySelected, currentCountryUuid } =
    useCountrySelection();

  const {
    data: countries,
    isLoading: isCountryLoading,
    isError: isCountryError,
    refetch: onCountryRetry,
  } = useGetCountryOptions();
  const {
    data: universities,
    isLoading: isUniversityLoading,
    isError: isUniversityError,
    refetch: onUniversityRetry,
  } = useGetUniversityOptionsByCountryUuid(isCountrySelected, currentCountryUuid);
  const isSubmitDisabled = isCountryLoading || isUniversityLoading || isCountryError || isUniversityError;

  const methods = useForm<FormInputValues>({
    mode: 'onSubmit',
    defaultValues: {
      countryUuid: '',
      universityUuid: '',
      courseName: '',
      minorSubject: '',
      programmeLength: 3,
    },
    resolver: zodResolver(formValidationSchema),
  });
  const { handleSubmit, setError, reset } = methods;
  const { mutate: createApplicationRecord, isPending: isSubmitting } = useCreateApplication(
    setError,
    resetCountrySelection,
    reset,
  );

  return (
    <section className={joinTw('core-tertiary-border', 'w-9/10 md:w-8/10 2xl:max-w-[100rem]', 'my-[5%]')}>
      <FormProvider {...methods}>
        <CoreFormWrapper
          formId={'post-application-record-by-student-form'}
          onFormSubmit={handleSubmit((formData: FormInputValues) => {
            createApplicationRecord(formData as CreateApplicationRecordByStudentPayload);
          })}
          className={'core-application-grid'}
        >
          <CoreFormHeader
            title={t('newApplicationRecordFormTitle')}
            intent={'largeWithUnderline'}
            className={'col-start-1 col-end-3'}
          />
          <CoreFormElementInstruction
            paragraph={t('newApplicationRecordFormInformation')}
            className={'col-start-1 col-end-3'}
          />
          <CommonSelectGroup
            id={'countryUuid'}
            isLoading={isCountryLoading}
            isFetchError={isCountryError}
            isDisabled={isSubmitting}
            onRetry={onCountryRetry}
            onChangeHandler={handleCountrySelection}
            options={
              countries?.map((countryOption: CountryOption) => (
                <option
                  key={countryOption.uuid}
                  value={countryOption.uuid}
                >
                  {countryOption.name}
                </option>
              )) ?? []
            }
            label={t('countryLabel')}
            initialValue={t('countryPlaceholder')}
            intent={CoreSelectElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('countryNewFieldInformation')} />
          {isUniversityLoading ? (
            <p>{t('universityDataFetching')}</p>
          ) : (
            <CommonSelectGroup
              id={'universityUuid'}
              isLoading={isUniversityLoading}
              isFetchError={isUniversityError}
              isDisabled={isSubmitting || !isCountrySelected}
              onRetry={onUniversityRetry}
              options={
                universities?.map((universityOption: UniversityOption) => (
                  <option
                    key={universityOption.uuid}
                    value={universityOption.uuid}
                  >
                    {`${universityOption.name} - ${universityOption.abbreviation}`}
                  </option>
                )) ?? []
              }
              label={t('universityLabel')}
              initialValue={t('universityPlaceholder')}
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
          )}
          <CoreFormElementInstruction paragraph={t('universityNewFieldInformation')} />
          <CommonInputGroup
            id={'courseName'}
            type={'text'}
            isDisabled={isSubmitting}
            label={t('courseNameLabel')}
            placeholder={t('courseNamePlaceholder')}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('courseNameNewFieldInformation')} />
          <CommonInputGroup
            id={'minorSubject'}
            type={'text'}
            isDisabled={isSubmitting}
            label={t('minorSubjectLabel')}
            placeholder={t('minorSubjectPlaceholder')}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('minorSubjectNewFieldInformation')} />
          <CommonInputGroup
            id={'programmeLength'}
            label={t('programmeLengthLabel')}
            type={'number'}
            isDisabled={isSubmitting}
            intent={CoreInputElementStyleIntent.LIGHT}
          />
          <CoreFormElementInstruction paragraph={t('programmeLengthNewFieldInformation')} />
          <CoreFormAction
            isSubmissionPending={isSubmitting}
            isDisabled={isSubmitDisabled}
            formActionConfig={{
              message: t('createApplicationRecordFormSubmission'),
              value: t('createApplicationRecordFormSubmit'),
            }}
            intent={CoreSubmitInputElementStyleIntent.DARK}
            className={'col-start-1 col-end-3'}
          />
        </CoreFormWrapper>
      </FormProvider>
    </section>
  );
};
