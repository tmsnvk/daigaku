package net.tamasnovak.domains.applicationStages.interviewStatus.models.entity;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.domains.application.shared.models.entity.Application;
import net.tamasnovak.domains.applicationStages.shared.models.entity.BaseStatusEntity;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "interview_status")
public final class InterviewStatus extends BaseStatusEntity {
  @OneToMany(mappedBy = "interviewStatus")
  @JsonManagedReference(value = "interview_status-application_reference")
  private List<Application> applications;

  protected InterviewStatus() {}

  private InterviewStatus(String name) {
    super(name);
    this.applications = new ArrayList<>();
  }
}
