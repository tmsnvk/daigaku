package net.tamasnovak.services.university;

import net.tamasnovak.entities.University;
import net.tamasnovak.repositories.UniversityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public final class UniversityService {
  public final UniversityRepository universityRepository;

  @Autowired
  public UniversityService(UniversityRepository universityRepository) {
    this.universityRepository = universityRepository;
  }

  public List<University> findAll() {
    return universityRepository.findAll(Sort.by(Sort.Direction.ASC, "name"));
  }
}
