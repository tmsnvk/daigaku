/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

/* vendor imports */
import { UseMutationResult, useMutation } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { UseFormSetError } from 'react-hook-form';

/* logic imports */
import { applicationStudentService } from '@services';

/* configuration, utilities, constants imports */
import { mutationKeys, queryClient, queryKeys } from '@configuration';
import { errorConstants } from '@constants';

/* interface, type, enum imports */
import { Application, CoreErrorResponse, ErrorDetail, UpdateApplicationByStudent } from '@common-types';

/**
 * Defines the possible error field names in the {@link useUpdateApplicationFormMutation} custom hook.
 */
type UpdateApplicationFormErrorT =
  | 'root'
  | 'applicationStatusUuid'
  | 'interviewStatusUuid'
  | 'offerStatusUuid'
  | 'responseStatusUuid'
  | 'finalDestinationStatusUuid';

/**
 * Manages the {@link ApplicationForm} submission process, including REST API request, error handling,
 * and post-success actions, such as setting account context and authentication status.
 *
 * @param setError `react-hook-form`'s error setting method.
 * @param applicationUuid The application's uuid string.
 * @return {UseMutationResult<Application, AxiosError<CoreErrorResponse>, UpdateApplicationByStudent>}
 */
export const useUpdateApplicationFormMutation = (
  setError: UseFormSetError<UpdateApplicationByStudent>,
  applicationUuid: string,
): UseMutationResult<Application, AxiosError<CoreErrorResponse>, UpdateApplicationByStudent> => {
  return useMutation({
    mutationKey: [mutationKeys.application.PATCH_BY_UUID],
    mutationFn: (formData: UpdateApplicationByStudent) => applicationStudentService.patchByUuid(formData, applicationUuid),
    onSuccess: (response: Application) => {
      queryClient.setQueryData<Array<Application>>([queryKeys.application.GET_ALL_BY_ROLE], (applications) => {
        if (!applications) {
          return;
        }

        const filteredList: Array<Application> = applications.filter((application: Application) => application.uuid !== response.uuid);

        return [...filteredList, response];
      });

      history.replaceState(response, '', `/applications/edit/${response.uuid}`);
    },
    onError: (error: AxiosError<CoreErrorResponse>) => {
      if (axios.isAxiosError(error)) {
        const status: number | undefined = error.response?.data.errorCode;
        const errors: CoreErrorResponse | undefined = error.response?.data;

        if (status) {
          if (status === 400 && errors) {
            if (errors) {
              errors.errors.forEach((error: ErrorDetail) => {
                if (error.fieldName) {
                  setError(error.fieldName as UpdateApplicationFormErrorT, { message: error.errorMessage });
                }
              });
            }
          } else if (status >= 500) {
            setError('root', { message: errorConstants.UNEXPECTED_SERVER_ERROR });
          }
        }
      } else {
        setError('root', { message: errorConstants.UNEXPECTED_GLOBAL_ERROR });
      }
    },
  });
};
