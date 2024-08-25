/**
 * @prettier
 */

import { useGetStudentAndMentorAccountRoles } from './role';
import { useGetApplicationByUuid, useGetApplications } from './application';
import { useGetAllSelectOptions } from './application-status';
import { useGetCountryOptions } from './country';
import { useGetInstitutionOptions } from './institution';
import { useGetUniversityOptionsByCountryUuid } from './university';

export {
  useGetStudentAndMentorAccountRoles,
  useGetApplicationByUuid,
  useGetApplications,
  useGetAllSelectOptions,
  useGetCountryOptions,
  useGetInstitutionOptions,
  useGetUniversityOptionsByCountryUuid,
};
