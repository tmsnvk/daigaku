/**
 * @prettier
 */

import { useGetStudentAndMentorAccountRoles } from './role';
import { useGetApplications } from './application';
import { useGetAllSelectOptions } from './application-status';
import { useGetCountryOptions } from './country';
import { useGetInstitutionOptions } from './institution';
import { useGetUniversityOptionsByCountryUuid } from './university';

export {
  useGetStudentAndMentorAccountRoles,
  useGetApplications,
  useGetAllSelectOptions,
  useGetCountryOptions,
  useGetInstitutionOptions,
  useGetUniversityOptionsByCountryUuid,
};
