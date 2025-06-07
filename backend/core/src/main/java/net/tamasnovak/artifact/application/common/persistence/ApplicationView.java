/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.common.persistence;

import java.time.Instant;
import java.util.UUID;

import net.tamasnovak.artifact.application.common.entity.Application;

/**
 * Interface projection providing a view of selected identifiers for {@link Application} objects.
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
