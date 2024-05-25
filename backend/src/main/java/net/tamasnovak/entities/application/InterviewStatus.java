package net.tamasnovak.entities.application;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import net.tamasnovak.entities.base.status.BaseStatusEntity;

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
