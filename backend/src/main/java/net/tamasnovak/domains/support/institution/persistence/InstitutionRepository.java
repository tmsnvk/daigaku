package net.tamasnovak.domains.support.institution.persistence;

import net.tamasnovak.domains.support.institution.models.dtoResponses.InstitutionOptionDto;
import net.tamasnovak.domains.support.institution.models.entity.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
  Optional<Institution> findByUuid(UUID uuid);

  List<InstitutionOptionDto> findAllByOrderByNameAsc();
}
