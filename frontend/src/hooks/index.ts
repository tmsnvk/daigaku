/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { useGetApplicationByUuid, useGetApplications } from './application';
import { useGetAllSelectOptions } from './application-status';
import { useGetCountryOptions } from './country';
import { useGetInstitutionOptions } from './institution';
import { useModalControl, useModalToggle, useRenderModal } from './modal-components';
import { useGetStudentAndMentorAccountRoles } from './role';
import { useGetUniversityOptionsByCountryUuid } from './university';
import { useSmallScreenNavbarDisplay } from './navbar-components';
import { useMobileView } from './utility/use-mobile-view.ts';

export {
  useGetAllSelectOptions,
  useGetApplicationByUuid,
  useGetApplications,
  useGetCountryOptions,
  useGetInstitutionOptions,
  useGetStudentAndMentorAccountRoles,
  useGetUniversityOptionsByCountryUuid,
  useModalControl,
  useModalToggle,
  useRenderModal,
  useSmallScreenNavbarDisplay,
  useMobileView,
};
