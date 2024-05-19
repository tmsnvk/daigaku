package net.tamasnovak.entities.account.accountByRole;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.dtos.application.response.FinalDestinationDto;
import net.tamasnovak.dtos.application.response.FirmChoiceDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.base.id.BaseSimpleIdEntity;
import net.tamasnovak.entities.institution.Institution;
import net.tamasnovak.enums.status.FinalDestinationType;
import net.tamasnovak.enums.status.ResponseStatusType;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.function.Predicate;

@Entity
@Table(name = "students")
public final class Student extends BaseSimpleIdEntity {
  @OneToOne
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  @JsonManagedReference
  private Account account;

  @ManyToOne
  @JoinColumn(name = "mentor_id", nullable = false)
  @JsonBackReference
  private Mentor mentor;

  @ManyToOne
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference
  private Institution institution;

  @OneToMany(mappedBy = "student")
  private List<Application> applications;

  protected Student() {}

  private Student(Account account, Mentor mentor) {
    this.account = account;
    this.mentor = mentor;
    this.applications = new ArrayList<>();
  }

  public static Student createStudent(Account account, Mentor mentor) {
    return new Student(account, mentor);
  }

  public Account getAccount() {
    return account;
  }

  public Mentor getMentor() {
    return mentor;
  }

  public Institution getInstitution() {
    return institution;
  }

  public Application getFirmChoiceApplication() {
    return applications.stream()
      .filter((this::hasApplicationFirmChoiceStatus))
      .findFirst()
      .orElse(null);
  }

  public FirmChoiceDto getFirmChoiceDto() {
    Application application = getFirmChoiceApplication();

    if (application == null) {
      return null;
    }

    return new FirmChoiceDto(
      application.getCountry().getName(),
      application.getUniversity().getName(),
      application.getCourseName()
    );
  }

  private boolean hasApplicationFirmChoiceStatus(Application application) {
    return application.getResponseStatus() != null &&
      Objects.equals(application.getResponseStatus().getName(), ResponseStatusType.FIRM_CHOICE.getName());
  }

  public Application getFinalDestinationApplication() {
    return applications.stream()
      .filter(this::hasApplicationFinalDestinationStatus)
      .findFirst()
      .orElse(null);
  }

  public FinalDestinationDto getFinalDestinationDto() {
    Application application = getFinalDestinationApplication();

    if (application == null) {
      return null;
    }

    return new FinalDestinationDto(
      application.getCountry().getName(),
      application.getUniversity().getName(),
      application.getCourseName()
    );
  }

  private boolean hasApplicationFinalDestinationStatus(Application application) {
    return application.getFinalDestinationStatus() != null &&
      (Objects.equals(application.getFinalDestinationStatus().getName(), FinalDestinationType.FINAL_DESTINATION.getName()) ||
        Objects.equals(application.getFinalDestinationStatus().getName(), FinalDestinationType.DEFERRED_FINAL_DESTINATION.getName()));
  }

  public int getApplicationsSize() {
    return applications.size();
  }

  public <T> int countApplicationsByDistinctValue(Function<Application, T> extractor) {
    return (int) applications.stream()
      .map(extractor)
      .distinct()
      .count();
  }

  public int countApplicationsByPredicate(Predicate<? super Application> predicate) {
    return (int) applications.stream()
      .filter(predicate)
      .count();
  }
}
