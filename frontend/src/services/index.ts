/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

import { accountService } from './account/account.service';
import { pendingAccountService } from './account/pending-account.service';
import { applicationStudentService } from './application/application-student.service';
import { applicationService } from './application/application.service';
import { commentService } from './comment/comment.service';
import { roleService } from './role/role.service';
import { applicationStatusService } from './status/application-status.service';
import { finalDestinationStatusService } from './status/final-destination-status.service';
import { interviewStatusService } from './status/interview-status-service.service';
import { offerStatusService } from './status/offer-status.service';
import { responseStatusService } from './status/response-status.service';
import { countryService } from './support/country.service';
import { institutionService } from './support/institution.service';
import { universityService } from './support/university.service';

export {
  accountService,
  applicationService,
  applicationStatusService,
  applicationStudentService,
  commentService,
  countryService,
  finalDestinationStatusService,
  institutionService,
  interviewStatusService,
  offerStatusService,
  pendingAccountService,
  responseStatusService,
  roleService,
  universityService,
};
