import accountService from './account/account.service.ts';
import pendingAccountService from './account/pendingAccount.service.ts';
import roleService from './role/role.service.ts';
import applicationService from './application/application.service.ts';
import applicationStatusService from './status/applicationStatus.service.ts';
import countryService from '@services/support/country.service.ts';
import finalDestinationStatusService from './status/finalDestinationStatus.service.ts';
import institutionService from '@services/support/institution.service.ts';
import interviewStatusService from './status/interviewStatusService.service.ts';
import offerStatusService from './status/offerStatus.service.ts';
import responseStatusService from './status/responseStatus.service.ts';
import universityService from '@services/support/university.service.ts';

export {
  accountService,
  pendingAccountService,
  roleService,
  applicationService,
  applicationStatusService,
  countryService,
  finalDestinationStatusService,
  institutionService,
  interviewStatusService,
  offerStatusService,
  responseStatusService,
  universityService,
};
