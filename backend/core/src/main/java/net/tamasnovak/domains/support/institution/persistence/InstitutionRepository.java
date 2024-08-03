package net.tamasnovak.domains.support.institution.persistence;

import net.tamasnovak.domains.support.institution.dto.InstitutionOption;
import net.tamasnovak.domains.support.institution.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
  Optional<Institution> findByUuid(UUID uuid);

  Optional<Institution> findInstitutionById(long id);

  List<InstitutionOption> findAllByOrderByNameAsc();
}
