/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { zodResolver } from '@hookform/resolvers/zod';
import { JSX, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

/* logic imports */
import { useGetCountryOptions, useGetUniversityOptionsByCountryUuid } from '@daigaku/hooks';
import { useCountrySelection, useCreateApplication } from '../hooks';

/* component imports */
import {
  CommonInputGroup,
  CommonSelectGroup,
  CoreFormAction,
  CoreFormElementInstruction,
  CoreFormHeader,
  CoreFormWrapper,
} from '@daigaku/components/form';
import { Toast } from '@daigaku/components/notification';

/* configuration, utilities, constants imports */
import { localization as l } from '@daigaku/constants';
import { joinTw } from '@daigaku/utilities';

/* interface, type, enum imports */
import {
  CoreInputElementStyleIntent,
  CoreSelectElementStyleIntent,
  CoreSubmitInputElementStyleIntent,
  CountryOption,
  CreateApplicationRecordByStudentPayload,
  UniversityOption,
} from '@daigaku/common-types';

const formValidationSchema = z.object({
  countryUuid: z.string().uuid({ message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.COUNTRY.VALIDATION.REQUIRED }),
  universityUuid: z.string().uuid({ message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.UNIVERSITY.VALIDATION.REQUIRED }),
  courseName: z
    .string()
    .trim()
    .nonempty({ message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.VALIDATION.REQUIRED })
    .regex(/^[\p{L}\s-]{1,255}$/u, {
      message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.VALIDATION.PATTERN,
    }),
  minorSubject: z
    .string()
    .trim()
    .max(255, { message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.VALIDATION.PATTERN }),
  programmeLength: z
    .number({ required_error: l.PAGES.STUDENT.NEW_APPLICATION.FORM.PROGRAMME_LENGTH.VALIDATION.REQUIRED })
    .min(1, { message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.PROGRAMME_LENGTH.VALIDATION.PATTERN })
    .max(5, { message: l.PAGES.STUDENT.NEW_APPLICATION.FORM.PROGRAMME_LENGTH.VALIDATION.PATTERN }),
});

type FormInputValues = z.infer<typeof formValidationSchema>;

const initialFormValues: FormInputValues = {
  countryUuid: '',
  universityUuid: '',
  courseName: '',
  minorSubject: '',
  programmeLength: 3,
};

const FORM_ID = 'post-application-record-by-student-form';

/**
 * Renders the new application submission form for student users.
 * The component utilizes the `react-hook-form` library for form handling, including validation,
 * and manages the form submission using the `react-query` library.
 *
 * @return {JSX.Element}
 */
export const CreateApplicationRecordForm = (): JSX.Element => {
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
    defaultValues: initialFormValues,
    resolver: zodResolver(formValidationSchema),
  });
  const { handleSubmit, setError, reset } = methods;

  const {
    mutate: createApplicationRecord,
    isPending: isSubmitting,
    isSuccess: isSubmissionSuccessful,
  } = useCreateApplication(setError, resetCountrySelection, reset);

  const countryOptions = useMemo(() => {
    return (
      countries?.map((countryOption: CountryOption) => (
        <option
          key={countryOption.uuid}
          value={countryOption.uuid}
        >
          {countryOption.name}
        </option>
      )) ?? []
    );
  }, [countries]);

  const universityOptions = useMemo(() => {
    return (
      universities?.map((universityOption: UniversityOption) => (
        <option
          key={universityOption.uuid}
          value={universityOption.uuid}
        >
          {`${universityOption.name} - ${universityOption.abbreviation}`}
        </option>
      )) ?? []
    );
  }, [universities]);

  return (
    <>
      <section className={joinTw('core-tertiary-border', 'w-9/10 md:w-8/10 2xl:max-w-[100rem]', 'my-[5%]')}>
        <FormProvider {...methods}>
          <CoreFormWrapper
            formId={FORM_ID}
            onFormSubmit={handleSubmit((formData: FormInputValues) => {
              createApplicationRecord(formData as CreateApplicationRecordByStudentPayload);
            })}
            className={joinTw('core-application-grid')}
          >
            <CoreFormHeader
              title={l.PAGES.STUDENT.NEW_APPLICATION.FORM.TITLE}
              intent={'largeWithUnderline'}
              className={joinTw('col-start-1 col-end-3')}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.INFORMATION}
              className={joinTw('col-start-1 col-end-3')}
            />
            <CommonSelectGroup
              id={'countryUuid'}
              isLoading={isCountryLoading}
              isError={isCountryError}
              isDisabled={isSubmitting}
              onRetry={onCountryRetry}
              onChangeHandler={handleCountrySelection}
              options={countryOptions}
              label={l.COMPONENTS.FORM.COUNTRY_DROPDOWN.LABEL}
              initialValue={l.COMPONENTS.FORM.ACCOUNT_ROLE_DROPDOWN.DEFAULT_OPTION}
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COUNTRY.INFORMATION} />
            <CommonSelectGroup
              id={'universityUuid'}
              isLoading={isUniversityLoading}
              isError={isUniversityError}
              isDisabled={isSubmitting || !isCountrySelected}
              onRetry={onUniversityRetry}
              options={universityOptions}
              label={l.COMPONENTS.FORM.UNIVERSITY_DROPDOWN.LABEL}
              initialValue={l.COMPONENTS.FORM.UNIVERSITY_DROPDOWN.DEFAULT_OPTION}
              intent={CoreSelectElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.UNIVERSITY.INFORMATION} />
            <CommonInputGroup
              id={'courseName'}
              type={'text'}
              isDisabled={isSubmitting}
              label={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.LABEL}
              placeholder={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.PLACEHOLDER}
              intent={CoreInputElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.COURSE_NAME.INFORMATION} />
            <CommonInputGroup
              id={'minorSubject'}
              type={'text'}
              isDisabled={isSubmitting}
              label={l.PAGES.STUDENT.NEW_APPLICATION.FORM.MINOR_SUBJECT.LABEL}
              placeholder={l.PAGES.STUDENT.NEW_APPLICATION.FORM.MINOR_SUBJECT.PLACEHOLDER}
              intent={CoreInputElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.MINOR_SUBJECT.INFORMATION} />
            <CommonInputGroup
              id={'programmeLength'}
              label={l.PAGES.STUDENT.NEW_APPLICATION.FORM.PROGRAMME_LENGTH.LABEL}
              type={'number'}
              isDisabled={isSubmitting}
              intent={CoreInputElementStyleIntent.LIGHT}
            />
            <CoreFormElementInstruction
              paragraphs={l.PAGES.STUDENT.NEW_APPLICATION.FORM.PROGRAMME_LENGTH.INFORMATION}
            />
            <CoreFormAction
              submitId={FORM_ID}
              isSubmissionPending={isSubmitting}
              isDisabled={isSubmitDisabled}
              formActionConfig={{
                message: l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.FORM_SUBMIT_LOADING,
                value: l.PAGES.STUDENT.NEW_APPLICATION.FORM.SUBMIT,
              }}
              intent={CoreSubmitInputElementStyleIntent.DARK}
              className={joinTw('col-start-1 col-end-3')}
            />
          </CoreFormWrapper>
        </FormProvider>
      </section>
      <Toast
        isVisible={isSubmissionSuccessful}
        message={l.PAGES.STUDENT.NEW_APPLICATION.MESSAGES.SUCCESS_TOAST}
      />
    </>
  );
};
