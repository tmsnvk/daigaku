/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { useGetApplicationByUuid } from './application/use-get-application-by-uuid.tsx';
import { useGetApplications } from './application/use-get-applications.tsx';
import { useModalControl } from './components/use-modal-control.tsx';
import { useModalToggle } from './components/use-modal-toggle.tsx';
import { useRenderModal } from './components/use-render-modal.tsx';
import { useSmallScreenNavbarDisplay } from './components/use-small-screen-navbar-display.tsx';
import { useGetAllSelectOptions } from './form/use-get-all-select-options.tsx';
import { useGetCountryOptions } from './form/use-get-country-options.tsx';
import { useGetInstitutionOptions } from './form/use-get-institution-options.tsx';
import { useGetStudentAndMentorAccountRoles } from './form/use-get-student-and-mentor-account-roles.tsx';
import { useGetUniversityOptionsByCountryUuid } from './form/use-get-university-options-by-country-uuid.tsx';
import { useMobileView } from './utility/use-mobile-view.ts';

export {
  useGetAllSelectOptions,
  useGetApplicationByUuid,
  useGetApplications,
  useGetCountryOptions,
  useGetInstitutionOptions,
  useGetStudentAndMentorAccountRoles,
  useGetUniversityOptionsByCountryUuid,
  useMobileView,
  useModalControl,
  useModalToggle,
  useRenderModal,
  useSmallScreenNavbarDisplay,
};
