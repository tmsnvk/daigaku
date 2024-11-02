/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.application.persistence;

import java.util.UUID;

import net.tamasnovak.artifact.application.shared.entity.Application;

/**
 * Interface projection providing a view of selected identifiers for an {@link Application}.
 *
 * @since 0.0.1
 */
public interface ApplicationIdsView {
  /**
   * Returns the uuid of the student owner's account associated with the application.
   *
   * @return The uuid of the student owner's account.
   */
  UUID getStudentOwnerAccountUuid();

  /**
   * Returns the uuid of the student's mentor's account associated with the application.
   *
   * @return The uuid of the student's mentor's account.
   */
  UUID getStudentMentorAccountUuid();
}
