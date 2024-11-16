/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.common.persistence;

import java.time.Instant;
import java.util.UUID;

import net.tamasnovak.artifact.application.common.entity.Application;

/**
 * Interface projection providing a view of selected identifiers for {@link Application} objects.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface ApplicationView {
  UUID getUuid();

  UUID getAccountUuid();

  String getCountry();

  String getUniversity();

  String getCourseName();

  String getMinorSubject();

  Integer getProgrammeLength();

  UUID getApplicationStatusUuid();

  String getApplicationStatusName();

  UUID getInterviewStatusUuid();

  String getInterviewStatusName();

  UUID getOfferStatusUuid();

  String getOfferStatusName();

  UUID getResponseStatusUuid();

  String getResponseStatusName();

  UUID getFinalDestinationStatusUuid();

  String getFinalDestinationStatusName();

  Instant getCreatedAt();

  Instant getLastUpdatedAt();

  String getCreatedBy();

  String getLastModifiedBy();

  Boolean getIsRemovable();
}
