package net.tamasnovak.repositories.interviewStatus;

import net.tamasnovak.entities.application.InterviewStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InterviewStatusRepository extends JpaRepository<InterviewStatus, Long> {
  List<InterviewStatus> findAll();
}
