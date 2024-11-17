/**
 * Copyright © [Daigaku].
 * This file contains proprietary code.
 * Unauthorized copying, modification, or distribution of this file, whether in whole or in part is prohibited.
 *
 * @author tmsnvk
 */

package net.tamasnovak.artifact.support.institution.persistence;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import net.tamasnovak.artifact.support.institution.dto.InstitutionSelectOption;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * JPA repository for {@link Institution} entities.
 *
 * @since 0.0.1
 */
@SuppressWarnings("checkstyle:MissingJavadocMethod")
public interface InstitutionRepository extends JpaRepository<Institution, Long> {
  Optional<Institution> findInstitutionByUuid(UUID institutionUuid);

  Optional<Institution> findInstitutionById(long id);

  List<InstitutionSelectOption> findInstitutionsByOrderByNameAsc();
}
