/**
 * Copyright © [Daigaku].
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.applicationstatus.interviewstatus.service;

import java.util.List;
import java.util.UUID;

import jakarta.persistence.EntityNotFoundException;
import net.tamasnovak.artifact.applicationstatus.common.dto.StatusSelectOption;
import net.tamasnovak.artifact.applicationstatus.interviewstatus.entity.InterviewStatus;

/**
 * Service interface for managing {@link InterviewStatus} entity-related API operations.
 */
public interface InterviewStatusService {
  /**
   * Finds a {@link InterviewStatus} object by its uuid.
   *
   * @param statusUuid The InterviewStatus's uuid.
   * @return {@link InterviewStatus}.
   * @throws EntityNotFoundException Thrown if no status is associated with the provided uuid.
   */
  InterviewStatus findStatusByUuid(UUID statusUuid);

  /**
   * Finds a {@link InterviewStatus} object by its name.
   *
   * @param statusName The InterviewStatus's name.
   * @return {@link InterviewStatus}.
   * @throws EntityNotFoundException Thrown if no status is associated with the provided uuid.
   */
  InterviewStatus findStatusByName(String statusName);

  /**
   * Finds a list of {@link InterviewStatus} {@link StatusSelectOption} objects.
   *
   * @return A list of {@link StatusSelectOption}.
   */
  List<StatusSelectOption> findAllSortedByName();
}
