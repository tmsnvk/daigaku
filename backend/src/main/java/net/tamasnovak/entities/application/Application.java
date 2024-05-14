package net.tamasnovak.entities.application;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import net.tamasnovak.dtos.application.request.UpdateApplicationByStudentDto;
import net.tamasnovak.entities.account.accountByRole.Student;
import net.tamasnovak.entities.base.audit.Auditable;
import net.tamasnovak.entities.country.Country;
import net.tamasnovak.entities.enums.ApplicationStatusType;
import net.tamasnovak.entities.enums.FinalDestinationType;
import net.tamasnovak.entities.enums.InterviewStatusType;
import net.tamasnovak.entities.enums.OfferStatusType;
import net.tamasnovak.entities.enums.ResponseStatusType;
import net.tamasnovak.entities.university.University;
import net.tamasnovak.exceptions.invalidFormFieldException.InvalidFormFieldException;
import net.tamasnovak.exceptions.invalidFormFieldException.InvalidFormFieldExceptionConstants;

import java.util.Objects;

@Entity
@Table(name = "applications")
public final class Application extends Auditable {
  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "student_id", nullable = false)
  @JsonBackReference
  private Student student;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "country_id", nullable = false)
  @JsonBackReference
  private Country country;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "university_id", nullable = false)
  @JsonBackReference
  private University university;

  @Column(name = "course_name", nullable = false)
  @NotBlank(message = "Provide the title of your course.")
  @Pattern(regexp = "^([a-zA-Z-\\s]{5,255})$", message = "Use only letters and spaces. Provide a minimum of 5 and a maximum of 255 characters.")
  private String courseName;

  @Column(name = "minor_subject")
  @Pattern(regexp = "^(?:[a-zA-Z-\\s]{5,255}|)$", message = "Use only letters and spaces. Provide a minimum of 5 and a maximum of 255 characters.")
  private String minorSubject;

  @Column(name = "programme_length", nullable = false)
  @NotNull(message = "Provide the length of your course (in years).")
  @Min(value = 2, message = "Programme length should not be less than 2.")
  @Max(value = 5, message = "Programme length should not be more than 5.")
  private int programmeLength;

  @ManyToOne
  @JoinColumn(name = "application_status_id")
  @JsonBackReference
  private ApplicationStatus applicationStatus;

  @ManyToOne
  @JoinColumn(name = "interview_status_id")
  @JsonBackReference
  private InterviewStatus interviewStatus;

  @ManyToOne
  @JoinColumn(name = "offer_status_id")
  @JsonBackReference
  private OfferStatus offerStatus;

  @ManyToOne
  @JoinColumn(name = "response_status_id")
  @JsonBackReference
  private ResponseStatus responseStatus;

  @ManyToOne
  @JoinColumn(name = "final_destination_status_id")
  @JsonBackReference
  private FinalDestinationStatus finalDestinationStatus;

  @Column(name = "is_marked_for_deletion")
  @NotNull
  private boolean isMarkedForDeletion;

  protected Application() {}

  private Application(Student student, Country country, University university, String courseName, String minorSubject, int programmeLength, ApplicationStatus applicationStatus) {
    this.student = student;
    this.country = country;
    this.university = university;
    this.courseName = courseName;
    this.minorSubject = minorSubject;
    this.applicationStatus = applicationStatus;
    this.programmeLength = programmeLength;
    this.isMarkedForDeletion = false;
  }

  public static Application createApplicationByStudent(Student student, Country country, University university, String courseName, String minorSubject, int programmeLength, ApplicationStatus applicationStatus) {
    return new Application(student, country, university, courseName, minorSubject, programmeLength, applicationStatus);
  }

  public Student getStudent() {
    return student;
  }

  public Country getCountry() {
    return country;
  }

  public University getUniversity() {
    return university;
  }

  public String getCourseName() {
    return courseName;
  }

  public String getMinorSubject() {
    return minorSubject;
  }

  public int getProgrammeLength() {
    return programmeLength;
  }

  public ApplicationStatus getApplicationStatus() {
    return applicationStatus;
  }

  public InterviewStatus getInterviewStatus() {
    return interviewStatus;
  }

  public OfferStatus getOfferStatus() {
    return offerStatus;
  }

  public ResponseStatus getResponseStatus() {
    return responseStatus;
  }

  public FinalDestinationStatus getFinalDestinationStatus() {
    return finalDestinationStatus;
  }

  public boolean isMarkedForDeletion() {
    return isMarkedForDeletion;
  }

  public void validateStatusFields(UpdateApplicationByStudentDto applicationDto, ApplicationStatus newApplicationStatus, InterviewStatus newInterviewStatus, OfferStatus newOfferStatus, ResponseStatus newResponseStatus, FinalDestinationStatus newFinalDestinationStatus) {
    validateApplicationStatus(applicationDto.applicationStatusUuid(), newApplicationStatus);
    validateResponseStatus(newResponseStatus, applicationDto);
    validateFinalDestinationStatus(newFinalDestinationStatus, applicationDto);

    validateInterviewStatus(newInterviewStatus, applicationDto);
    validateOfferStatus(newOfferStatus, applicationDto);
  }

  public void updateStatusFields(ApplicationStatus applicationStatus, InterviewStatus interviewStatus, OfferStatus offerStatus, ResponseStatus responseStatus, FinalDestinationStatus finalDestinationStatus) {
    this.applicationStatus = applicationStatus;
    this.interviewStatus = interviewStatus;
    this.offerStatus = offerStatus;
    this.responseStatus = responseStatus;
    this.finalDestinationStatus = finalDestinationStatus;
  }

  private void validateApplicationStatus(String applicationStatusUUid, ApplicationStatus newApplicationStatus) {
    if (Objects.equals(applicationStatusUUid, "")) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.MISSING_APPLICATION_STATUS);
    }

    if (Objects.equals(newApplicationStatus.getName(), ApplicationStatusType.PLANNED.getType()) && Objects.equals(this.applicationStatus.getName(), ApplicationStatusType.PLANNED.getType())) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.PLANNED_ERROR);
    }

    if (Objects.equals(newApplicationStatus.getName(), ApplicationStatusType.WITHDRAWN.getType()) && Objects.equals(this.applicationStatus.getUuid(), newApplicationStatus.getUuid())) {
      throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.WITHDRAWN_ERROR);
    }
  }

  private void validateInterviewStatus(InterviewStatus newInterviewStatus, UpdateApplicationByStudentDto applicationDto) {
    if (newInterviewStatus != null) {
      if (Objects.equals(newInterviewStatus.getName(), InterviewStatusType.NOT_INVITED.getType()) && (!Objects.equals(applicationDto.offerStatusUuid(), "") || !Objects.equals(applicationDto.responseStatusUuid(), "") || !Objects.equals(applicationDto.finalDestinationStatusUuid(), ""))) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.GENERIC_ERROR);
      }
    }

    if (this.interviewStatus != null) {
      if (Objects.equals(this.interviewStatus.getName(), InterviewStatusType.NOT_INVITED.getType()) && Objects.equals(applicationDto.interviewStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.NOT_INVITED_ERROR);
      }
    }
  }

  private void validateOfferStatus(OfferStatus newOfferStatus, UpdateApplicationByStudentDto applicationDto) {
    if (newOfferStatus != null) {
      if (Objects.equals(newOfferStatus.getName(), OfferStatusType.REJECTED.getType()) && (!Objects.equals(applicationDto.responseStatusUuid(), "") || !Objects.equals(applicationDto.finalDestinationStatusUuid(), ""))) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.GENERIC_ERROR);
      }
    }

    if (this.offerStatus != null) {
      if (Objects.equals(this.offerStatus.getName(), OfferStatusType.REJECTED.getType()) && Objects.equals(applicationDto.offerStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.REJECTED_ERROR);
      }
    }
  }

  private void validateResponseStatus(ResponseStatus newResponseStatus, UpdateApplicationByStudentDto applicationDto) {
    if (newResponseStatus != null) {
      if (Objects.equals(newResponseStatus.getName(), ResponseStatusType.OFFER_DECLINED.getType()) && !Objects.equals(applicationDto.finalDestinationStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.GENERIC_ERROR);
      }

      if (getFirmChoiceApplication() != null && !Objects.equals(this.uuid, getFirmChoiceApplication().getUuid()) && Objects.equals(newResponseStatus.getName(), ResponseStatusType.FIRM_CHOICE.getType())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.FIRM_CHOICE_ERROR);
      }
    }

    if (this.responseStatus != null) {
      if (Objects.equals(this.responseStatus.getName(), ResponseStatusType.OFFER_DECLINED.getType()) && Objects.equals(applicationDto.responseStatusUuid(), "")) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.DECLINED_ERROR);
      }
    }
  }

  private void validateFinalDestinationStatus(FinalDestinationStatus newFinalDestinationStatus, UpdateApplicationByStudentDto applicationDto) {
    if (newFinalDestinationStatus != null) {
      if (getFinalDestinationApplication() != null && !Objects.equals(this.uuid, getFinalDestinationApplication().getUuid()) && !Objects.equals(newFinalDestinationStatus.getName(), FinalDestinationType.NOT_FINAL_DESTINATION.getType())) {
        throw new InvalidFormFieldException(InvalidFormFieldExceptionConstants.FINAL_DESTINATION_ERROR);
      }
    }
  }

  private Application getFirmChoiceApplication() {
    return this.student.getFirmChoiceApplication();
  }

  private Application getFinalDestinationApplication() {
    return this.student.getFinalDestinationApplication();
  }
}
