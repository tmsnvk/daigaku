/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.application.studentapplication.service;

import java.util.List;
import java.util.UUID;

import net.tamasnovak.artifact.account.account.entity.Account;
import net.tamasnovak.artifact.accounttype.student.entity.Student;
import net.tamasnovak.artifact.application.shared.dto.ApplicationData;
import net.tamasnovak.artifact.application.shared.entity.Application;
import net.tamasnovak.artifact.application.studentapplication.dto.NewApplicationByStudent;
import net.tamasnovak.artifact.application.studentapplication.dto.StudentDashboardStatistics;
import net.tamasnovak.artifact.application.studentapplication.dto.UpdateApplicationByStudent;

/**
 * Service interface managing {@link Application} entity-related API calls towards the database related to {@link Student}
 * authenticated users.
 *
 * @since 0.0.1
 */
public interface StudentApplicationService {
  /**
   * Retrieves a list of {@link ApplicationData} objects for a {@link Student} based on the provided account uuid.
   *
   * @param accountUuid The uuid of the student's account.
   * @return A list of {@link ApplicationData}.
   */
  List<ApplicationData> findApplicationDataByAccountUuid(UUID accountUuid);

  /**
   * Toggles the is_removable status of a specified application identified by its uuid.
   *
   * @param applicationUuid The application's uuid.
   * @param accountUuid The authenticated user's account uuid.
   */
  void toggleIsRemovableByApplicationUuid(UUID applicationUuid, UUID accountUuid);

  /**
   * Retrieves dashboard statistics data for a {@link Student} user.
   *
   * @param account The student's account.
   * @return {@link StudentDashboardStatistics}
   */
  StudentDashboardStatistics findStudentDashboardDataByAccount(Account account);

  /**
   * Creates a new application for the authenticated {@link Student} user.
   *
   * @param account The authenticated user account.
   * @param requestBody The application creation request body.
   * @return {@link ApplicationData}
   */
  ApplicationData createApplication(Account account, NewApplicationByStudent requestBody);

  /**
   * Updates the {@link Application} object in the database that is associated with the provided application uuid.
   *
   * @param uuid The to-be-updated application's uuid.
   * @param requestBody The application update request body.
   * @param account The account associated with the to-be-updated application.
   * @return {@link ApplicationData}
   */
  ApplicationData updateApplicationAndFetchByUuid(UUID uuid, UpdateApplicationByStudent requestBody, Account account);

  /**
   * Initiates the user's request to download their submitted {@link Application} objects in .pdf format.
   *
   * @param accountUuid The authenticated account's uuid.
   */
  void initiateApplicationPdfDownloadRequest(UUID accountUuid);
}
