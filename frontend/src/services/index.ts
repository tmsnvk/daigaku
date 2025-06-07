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
import { countryService } from './support/country.service';
import { institutionService } from './support/institution.service';
import { universityService } from './support/university.service';

export {
  accountService,
  applicationService,
  applicationStudentService,
  commentService,
  countryService,
  institutionService,
  pendingAccountService,
  roleService,
  universityService,
};
