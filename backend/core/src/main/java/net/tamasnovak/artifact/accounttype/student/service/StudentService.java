/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.accounttype.student.service;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.student.entity.Student;

/**
 * Service interface that manages {@link Student} entity-related API calls towards the database.
 *
 * @since 0.0.1
 */
public interface StudentService {
  /**
   * Retrieves a {@link Student} object associated with the specified {@link Account}.
   *
   * @param account The account for which the corresponding student is to be found.
   * @return The student associated with the given account.
   * @throws EntityNotFoundException If no student is associated with the provided account.
   */
  Student findStudentByAccount(Account account);
}
