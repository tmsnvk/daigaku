/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.shared.persistence;

import java.time.Instant;
import java.util.UUID;

import net.tamasnovak.artifact.application.shared.entity.Application;

/**
 * Represents a projection of selected identifiers for an {@link Application}.
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

  String getApplicationStatus();

  String getInterviewStatus();

  String getOfferStatus();

  String getResponseStatus();

  String getFinalDestinationStatus();

  Instant getCreatedAt();

  Instant getLastUpdatedAt();

  String getCreatedBy();

  String getLastModifiedBy();

  Boolean getIsRemovable();
}
