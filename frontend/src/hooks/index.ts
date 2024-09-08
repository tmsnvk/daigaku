/**
 * @prettier
 */

/**
 * @fileoverview
 * @author tmsnvk
 *
 *
 * Copyright © [Daigaku].
 *
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 */

import { useGetApplicationByUuid, useGetApplications } from './application';
import { useGetAllSelectOptions } from './application-status';
import { useGetCountryOptions } from './country';
import { useGetInstitutionOptions } from './institution';
import { useModalControl, useModalToggle, useRenderModal } from './modal-components';
import { useGetStudentAndMentorAccountRoles } from './role';
import { useGetUniversityOptionsByCountryUuid } from './university';

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
};
