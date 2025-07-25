/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { JSX } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

/* logic imports */
import { useGetUniversityOptionsByCountryUuid } from '@daigaku/hooks';
import { joinTw } from '@daigaku/utilities';
import { useCountrySelection } from '../hooks/use-country-selection.tsx';
import { useCreateApplicationForm } from '../hooks/use-create-application-form.tsx';
import { CreateApplicationSchema, createApplicationSchema } from '../schema.ts';

/* component imports */
import {
  CommonInputGroup,
  CommonSelectGroup,
  CommonStaticSelectGroup,
  CoreFormAction,
  CoreFormElementInstruction,
  CoreFormHeader,
  CoreFormWrapper,
} from '@daigaku/components/common/form';

/* interface, type imports */
import { CountryOption, CreateApplicationByStudentPayload, UniversityOption } from '@daigaku/common-types';

/**
 *
 */
interface CreateApplicationRecordFormProps {
  countryOptions: Array<CountryOption>;
}

/**
 * Renders the new application submission form for student users.
 * The component utilizes the `react-hook-form` library for form handling, including validation,
 * and manages the form submission using the `react-query` library.
 *
 * @return {JSX.Element}
 */
export const CreateApplicationForm = ({ countryOptions }: CreateApplicationRecordFormProps): JSX.Element => {
  const { t } = useTranslation();

  const { handleCountrySelection, resetCountrySelection, isCountrySelected, selectedCountryUuid } =
    useCountrySelection();

  const {
    data: universities,
    isLoading: isUniversityLoading,
    isError: isUniversityError,
    refetch: onUniversityRetry,
  } = useGetUniversityOptionsByCountryUuid(selectedCountryUuid);

  const methods = useForm<CreateApplicationSchema>({
    defaultValues: {
      countryUuid: '',
      universityUuid: '',
      courseName: '',
      minorSubject: '',
      programmeLength: 3,
    },
    mode: 'onSubmit',
    resolver: standardSchemaResolver(createApplicationSchema),
  });

  const { handleSubmit, setError, reset } = methods;

  const { mutate: createApplication, isPending: isSubmitting } = useCreateApplicationForm(
    setError,
    resetCountrySelection,
    reset,
  );

  const onFormSubmit = handleSubmit((formData: CreateApplicationSchema) => {
    createApplication(formData as CreateApplicationByStudentPayload);
  });

  return (
    <section className={joinTw('core-tertiary-border w-9/10 my-[5%]', 'md:w-8/10 2xl:max-w-[100rem]')}>
      <FormProvider {...methods}>
        <CoreFormWrapper
          formId={'post-application-record-by-student-form'}
          onFormSubmit={onFormSubmit}
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
          <CommonStaticSelectGroup
            id={'countryUuid'}
            isDisabled={isSubmitting}
            onChangeHandler={handleCountrySelection}
            options={
              countryOptions.map((countryOption: CountryOption) => (
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
            intent={'light'}
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
              intent={'light'}
            />
          )}
          <CoreFormElementInstruction paragraph={t('universityNewFieldInformation')} />
          <CommonInputGroup
            id={'courseName'}
            type={'text'}
            isDisabled={isSubmitting}
            label={t('courseNameLabel')}
            placeholder={t('courseNamePlaceholder')}
            intent={'light'}
          />
          <CoreFormElementInstruction paragraph={t('courseNameNewFieldInformation')} />
          <CommonInputGroup
            id={'minorSubject'}
            type={'text'}
            isDisabled={isSubmitting}
            label={t('minorSubjectLabel')}
            placeholder={t('minorSubjectPlaceholder')}
            intent={'light'}
          />
          <CoreFormElementInstruction paragraph={t('minorSubjectNewFieldInformation')} />
          <CommonInputGroup
            id={'programmeLength'}
            label={t('programmeLengthLabel')}
            type={'number'}
            isDisabled={isSubmitting}
            intent={'light'}
          />
          <CoreFormElementInstruction paragraph={t('programmeLengthNewFieldInformation')} />
          <CoreFormAction
            isSubmissionPending={isSubmitting}
            formActionConfig={{
              message: t('createApplicationRecordFormSubmission'),
              value: t('createApplicationRecordFormSubmit'),
            }}
            intent={'dark'}
            className={'col-start-1 col-end-3'}
          />
        </CoreFormWrapper>
      </FormProvider>
    </section>
  );
};
