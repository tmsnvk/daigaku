package net.tamasnovak.artifact.support.institution.persistence;

import net.tamasnovak.artifact.support.institution.dto.InstitutionDropdownOption;
import net.tamasnovak.artifact.support.institution.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
  Optional<Institution> findByUuid(UUID uuid);

  Optional<Institution> findInstitutionById(long id);

  List<InstitutionDropdownOption> findAllByOrderByNameAsc();
}
