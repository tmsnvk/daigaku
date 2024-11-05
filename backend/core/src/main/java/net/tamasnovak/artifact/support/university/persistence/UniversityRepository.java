/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.university.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.support.country.entity.Country;
import net.tamasnovak.artifact.support.university.dto.UniversitySelectOption;
import net.tamasnovak.artifact.support.university.entity.University;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link University} entities.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface UniversityRepository extends JpaRepository<University, Long> {
  Optional<University> findUniversityByUuid(UUID universityUuid);

  List<UniversitySelectOption> findByCountryOrderByNameAsc(Country country);
}
