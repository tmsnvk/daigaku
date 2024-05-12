package net.tamasnovak.entities.account.accountByRole;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import net.tamasnovak.dtos.application.response.FinalDestinationDto;
import net.tamasnovak.dtos.application.response.FirmChoiceDto;
import net.tamasnovak.entities.account.baseAccount.Account;
import net.tamasnovak.entities.application.Application;
import net.tamasnovak.entities.application.FinalDestinationStatus;
import net.tamasnovak.entities.application.ResponseStatus;
import net.tamasnovak.entities.base.id.BaseSimpleIdEntity;
import net.tamasnovak.entities.enums.FinalDestinationType;
import net.tamasnovak.entities.enums.ResponseStatusType;
import net.tamasnovak.entities.institution.Institution;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.function.Predicate;

@Entity
@Table(name = "students")
public final class Student extends BaseSimpleIdEntity {
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "account_id", referencedColumnName = "id")
  @JsonManagedReference
  private Account account;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "mentor_id", nullable = false)
  @JsonBackReference
  private Mentor mentor;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "institution_id", nullable = false)
  @JsonBackReference
  private Institution institution;

  @OneToMany(mappedBy = "student")
  private List<Application> applications;

  protected Student() {}

  public Student(Account account, Mentor mentor) {
    this.account = account;
    this.mentor = mentor;
    this.applications = new ArrayList<>();
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
      .filter((element -> {
        ResponseStatus responseStatus = element.getResponseStatus();

        return responseStatus != null && Objects.equals(element.getResponseStatus().getName(), ResponseStatusType.FIRM_CHOICE.getType());
      }))
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

  public Application getFinalDestinationApplication() {
    return applications.stream()
      .filter(element -> {
        FinalDestinationStatus finalDestinationStatus = element.getFinalDestinationStatus();

        return hasApplicationFinalDestinationStatus(element, finalDestinationStatus);
      })
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

  private boolean hasApplicationFinalDestinationStatus(Application application, FinalDestinationStatus finalDestinationStatus) {
    return finalDestinationStatus != null && (Objects.equals(application.getFinalDestinationStatus().getName(), FinalDestinationType.FINAL_DESTINATION.getType()) || Objects.equals(application.getFinalDestinationStatus().getName(), FinalDestinationType.DEFERRED_FINAL_DESTINATION.getType()));
  }

  public int countApplications() {
    return applications.size();
  }

  public <T> int countApplicationsByDistinctFieldValues(Function<Application, T> extractor) {
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
