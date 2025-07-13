/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { useGetMe } from './account/use-get-me.tsx';
import { useGetApplicationByUuid } from './application/use-get-application-by-uuid.tsx';
import { useGetApplications } from './application/use-get-applications.tsx';
import { useModalToggle } from './components/use-modal-toggle.tsx';
import { useRenderModal } from './components/use-render-modal.tsx';
import { useCoreApiMutation, useCoreApiQuery } from './configuration/use-core-api.tsx';
import { useCoreQueryClient } from './configuration/use-core-query-client.tsx';
import { useFieldValidationError } from './form/use-field-validation-error.tsx';
import { useGetCountryOptions } from './support/use-get-country-options.tsx';
import { useGetInstitutionOptions } from './support/use-get-institution-options.tsx';
import { useGetUniversityOptionsByCountryUuid } from './support/use-get-university-options-by-country-uuid.tsx';
import { useMobileView } from './utility/use-mobile-view.ts';

export {
  useCoreApiMutation,
  useCoreApiQuery,
  useCoreQueryClient,
  useFieldValidationError,
  useGetApplicationByUuid,
  useGetApplications,
  useGetCountryOptions,
  useGetInstitutionOptions,
  useGetMe,
  useGetUniversityOptionsByCountryUuid,
  useMobileView,
  useModalToggle,
  useRenderModal,
};
