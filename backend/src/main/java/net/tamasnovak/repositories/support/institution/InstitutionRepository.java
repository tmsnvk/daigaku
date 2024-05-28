package net.tamasnovak.repositories.support.institution;

import net.tamasnovak.dtos.institution.InstitutionOptionDto;
import net.tamasnovak.entities.support.institution.Institution;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface InstitutionRepository extends JpaRepository<Institution, Long> {
  List<InstitutionOptionDto> findAllByOrderByNameAsc();

  Optional<Institution> findByUuid(UUID uuid);
}
